'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Users, TrendingUp, FileCode, Search, Filter, Download, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface AnalysisRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  filename: string;
  fileSize: string;
  language: string;
  linesOfCode: number;
  issues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  scanTime: string;
  completionTime: string;
  status: 'completed' | 'processing' | 'failed';
}

export default function AdminSourceCodeAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing' | 'failed'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [records] = useState<AnalysisRecord[]>([
    {
      id: '1',
      userId: 'u001',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      filename: 'mobile-app-v2.3.zip',
      fileSize: '45.2MB',
      language: 'Java/Kotlin',
      linesOfCode: 125430,
      issues: { critical: 3, high: 12, medium: 45, low: 78 },
      scanTime: '2025-11-03 14:23:15',
      completionTime: '2025-11-03 14:45:20',
      status: 'completed',
    },
    {
      id: '2',
      userId: 'u002',
      userName: 'Jane Smith',
      userEmail: 'jane.smith@example.com',
      filename: 'backend-api.zip',
      fileSize: '23.8MB',
      language: 'TypeScript',
      linesOfCode: 67800,
      issues: { critical: 1, high: 8, medium: 23, low: 45 },
      scanTime: '2025-11-02 09:15:30',
      completionTime: '2025-11-02 09:28:45',
      status: 'completed',
    },
    {
      id: '3',
      userId: 'u003',
      userName: 'Mike Johnson',
      userEmail: 'mike.j@example.com',
      filename: 'frontend-react.zip',
      fileSize: '18.5MB',
      language: 'JavaScript/React',
      linesOfCode: 52100,
      issues: { critical: 0, high: 5, medium: 18, low: 32 },
      scanTime: '2025-11-01 16:40:10',
      completionTime: '2025-11-01 16:52:30',
      status: 'completed',
    },
  ]);

  const stats = [
    { label: 'Total Scans', value: records.length, color: 'from-blue-600 to-cyan-500', icon: FileCode },
    { label: 'Active Users', value: new Set(records.map(r => r.userId)).size, color: 'from-purple-600 to-pink-500', icon: Users },
    { label: 'Critical Issues', value: records.reduce((sum, r) => sum + r.issues.critical, 0), color: 'from-red-600 to-orange-500', icon: TrendingUp },
    { label: 'Completed Today', value: records.filter(r => r.status === 'completed' && r.scanTime.startsWith('2025-11-03')).length, color: 'from-green-600 to-emerald-500', icon: Code },
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.filename.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSeverityColor = (severity: keyof AnalysisRecord['issues']) => {
    const colors = {
      critical: 'text-red-400',
      high: 'text-orange-400',
      medium: 'text-yellow-400',
      low: 'text-blue-400',
    };
    return colors[severity];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Source Code Analysis</h1>
            <p className="text-slate-400">
              Monitor and manage all source code security scans
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <div className={`w-full h-1 rounded-t-lg bg-gradient-to-r ${stat.color} mb-4`}></div>
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-8 h-8 text-slate-400" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card glass>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by user, email, or filename..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Records Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Analysis Records ({filteredRecords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Filename</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Language</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">LOC</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Issues</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Scan Time</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-800 hover:bg-slate-800/30"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-white font-medium">{record.userName}</p>
                          <p className="text-xs text-slate-400">{record.userEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-blue-400">{record.filename}</p>
                          <p className="text-xs text-slate-500">{record.fileSize}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{record.language}</td>
                      <td className="py-3 px-4 text-slate-300">{record.linesOfCode.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2 text-xs">
                          {record.issues.critical > 0 && (
                            <span className={getSeverityColor('critical')}>C:{record.issues.critical}</span>
                          )}
                          {record.issues.high > 0 && (
                            <span className={getSeverityColor('high')}>H:{record.issues.high}</span>
                          )}
                          {record.issues.medium > 0 && (
                            <span className={getSeverityColor('medium')}>M:{record.issues.medium}</span>
                          )}
                          {record.issues.low > 0 && (
                            <span className={getSeverityColor('low')}>L:{record.issues.low}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-sm">{record.scanTime}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400'
                            : record.status === 'processing'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-slate-400 hover:text-white disabled:opacity-50"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded font-medium transition-all ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-slate-400 hover:text-white disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
