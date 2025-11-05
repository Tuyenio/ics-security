'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, AlertTriangle, CheckCircle, Search, Filter, Download, Eye, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ScanRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  filename: string;
  fileSize: string;
  version: string;
  platform: 'Android' | 'iOS' | 'Both';
  threats: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  scanTime: string;
  completionTime: string;
  status: 'completed' | 'processing' | 'failed';
  riskScore: number;
}

export default function AdminAppTotalGoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing' | 'failed'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [records] = useState<ScanRecord[]>([
    {
      id: '1',
      userId: 'u001',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      filename: 'Woori_bank.apk',
      fileSize: '103.49M',
      version: '2.0.94',
      platform: 'Android',
      threats: 2,
      vulnerabilities: { critical: 1, high: 3, medium: 8, low: 12 },
      scanTime: '2025-09-22 21:00:23',
      completionTime: '2025-10-27 11:20:31',
      status: 'completed',
      riskScore: 7.5,
    },
    {
      id: '2',
      userId: 'u002',
      userName: 'Jane Smith',
      userEmail: 'jane.smith@example.com',
      filename: 'lp_sign.apk',
      fileSize: '167.22M',
      version: '4.1.9',
      platform: 'Android',
      threats: 0,
      vulnerabilities: { critical: 0, high: 1, medium: 5, low: 8 },
      scanTime: '2025-09-21 13:10:37',
      completionTime: '2025-09-21 13:21:05',
      status: 'completed',
      riskScore: 3.2,
    },
    {
      id: '3',
      userId: 'u003',
      userName: 'Mike Johnson',
      userEmail: 'mike.j@example.com',
      filename: 'shb_merged.apk',
      fileSize: '79.93M',
      version: '5.24.4',
      platform: 'Android',
      threats: 1,
      vulnerabilities: { critical: 0, high: 2, medium: 6, low: 10 },
      scanTime: '2025-09-18 18:26:49',
      completionTime: '2025-09-18 18:50:15',
      status: 'completed',
      riskScore: 4.8,
    },
    {
      id: '4',
      userId: 'u004',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.w@example.com',
      filename: 'app-release.apk',
      fileSize: '6.27M',
      version: '1.0',
      platform: 'Android',
      threats: 0,
      vulnerabilities: { critical: 0, high: 0, medium: 2, low: 5 },
      scanTime: '2025-09-09 10:49:25',
      completionTime: '2025-09-09 11:10:09',
      status: 'completed',
      riskScore: 1.5,
    },
  ]);

  const stats = [
    { 
      label: 'Total Scans', 
      value: records.length, 
      color: 'from-blue-600 to-cyan-500', 
      icon: Shield 
    },
    { 
      label: 'Active Users', 
      value: new Set(records.map(r => r.userId)).size, 
      color: 'from-purple-600 to-pink-500', 
      icon: Users 
    },
    { 
      label: 'Threats Detected', 
      value: records.reduce((sum, r) => sum + r.threats, 0), 
      color: 'from-red-600 to-orange-500', 
      icon: AlertTriangle 
    },
    { 
      label: 'Clean Apps', 
      value: records.filter(r => r.threats === 0 && r.status === 'completed').length, 
      color: 'from-green-600 to-emerald-500', 
      icon: CheckCircle 
    },
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

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-red-400';
    if (score >= 4) return 'text-orange-400';
    if (score >= 2) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AppTotalGo Management</h1>
            <p className="text-slate-400">
              Monitor and manage all application security scans
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
            <CardTitle>Scan Records ({filteredRecords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Filename</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Platform</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Threats</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Vulnerabilities</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Risk Score</th>
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
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-400">
                          {record.platform}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${record.threats > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {record.threats}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2 text-xs">
                          {record.vulnerabilities.critical > 0 && (
                            <span className="text-red-400">C:{record.vulnerabilities.critical}</span>
                          )}
                          {record.vulnerabilities.high > 0 && (
                            <span className="text-orange-400">H:{record.vulnerabilities.high}</span>
                          )}
                          {record.vulnerabilities.medium > 0 && (
                            <span className="text-yellow-400">M:{record.vulnerabilities.medium}</span>
                          )}
                          {record.vulnerabilities.low > 0 && (
                            <span className="text-blue-400">L:{record.vulnerabilities.low}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${getRiskColor(record.riskScore)}`}>
                          {record.riskScore}/10
                        </span>
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
