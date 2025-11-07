'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Users, Clock, CheckCircle, Search, Filter, Download, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface TestRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  filename: string;
  fileSize: string;
  packageName: string;
  version: string;
  androidVersions: string[];
  devicesTestedCount: number;
  testDuration: string;
  uploadTime: string;
  completionTime: string;
  status: 'completed' | 'testing' | 'failed' | 'pending';
  compatibility: number; // percentage
}

export default function AdminCompatibilityPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'testing' | 'failed' | 'pending'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [records] = useState<TestRecord[]>([
    {
      id: '1',
      userId: 'u001',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      filename: 'BankApp.apk',
      fileSize: '85.3M',
      packageName: 'com.bank.app',
      version: '3.2.1',
      androidVersions: ['14', '13', '12', '11', '10'],
      devicesTestedCount: 25,
      testDuration: '18m 45s',
      uploadTime: '2025-11-05 09:30:15',
      completionTime: '2025-11-05 09:49:00',
      status: 'completed',
      compatibility: 96,
    },
    {
      id: '2',
      userId: 'u002',
      userName: 'Jane Smith',
      userEmail: 'jane.smith@example.com',
      filename: 'ShoppingApp.apk',
      fileSize: '62.7M',
      packageName: 'com.shop.mobile',
      version: '2.5.0',
      androidVersions: ['14', '13', '12'],
      devicesTestedCount: 15,
      testDuration: '12m 30s',
      uploadTime: '2025-11-04 14:20:30',
      completionTime: '2025-11-04 14:33:00',
      status: 'completed',
      compatibility: 100,
    },
    {
      id: '3',
      userId: 'u003',
      userName: 'Mike Johnson',
      userEmail: 'mike.j@example.com',
      filename: 'GameApp.apk',
      fileSize: '124.5M',
      packageName: 'com.game.awesome',
      version: '1.0.3',
      androidVersions: ['14', '13'],
      devicesTestedCount: 10,
      testDuration: '',
      uploadTime: '2025-11-04 11:15:45',
      completionTime: '',
      status: 'testing',
      compatibility: 0,
    },
    {
      id: '4',
      userId: 'u004',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.w@example.com',
      filename: 'UtilityApp.apk',
      fileSize: '45.2M',
      packageName: 'com.util.app',
      version: '4.1.0',
      androidVersions: ['14', '13', '12', '11'],
      devicesTestedCount: 20,
      testDuration: '15m 20s',
      uploadTime: '2025-11-03 16:45:20',
      completionTime: '2025-11-03 17:00:40',
      status: 'completed',
      compatibility: 85,
    },
  ]);

  const stats = [
    { 
      label: t('admin.compatibility.stats.totalTests'), 
      value: records.length, 
      color: 'from-blue-600 to-cyan-500', 
      icon: Smartphone 
    },
    { 
      label: t('admin.compatibility.stats.activeUsers'), 
      value: new Set(records.map(r => r.userId)).size, 
      color: 'from-purple-600 to-pink-500', 
      icon: Users 
    },
    { 
      label: t('admin.compatibility.stats.testing'), 
      value: records.filter(r => r.status === 'testing').length, 
      color: 'from-yellow-600 to-orange-500', 
      icon: Clock 
    },
    { 
      label: t('admin.compatibility.stats.completedToday'), 
      value: records.filter(r => r.status === 'completed' && r.completionTime.includes('2025-11-05')).length, 
      color: 'from-green-600 to-emerald-500', 
      icon: CheckCircle 
    },
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 95) return 'text-green-400';
    if (compatibility >= 85) return 'text-yellow-400';
    if (compatibility >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{t('admin.compatibility.title')}</h1>
            <p className="text-slate-400">
              {t('admin.compatibility.subtitle')}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {t('admin.common.exportReport')}
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
                  placeholder="Search by user, email, filename, or package name..."
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
                  <option value="testing">Testing</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Test Records Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Test Records ({filteredRecords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">APK Details</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Android Versions</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Devices</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Compatibility</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Upload Time</th>
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
                          <p className="text-blue-400 font-medium">{record.filename}</p>
                          <p className="text-xs text-slate-500">{record.packageName}</p>
                          <p className="text-xs text-slate-500">v{record.version} • {record.fileSize}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {record.androidVersions.map((version, i) => (
                            <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                              {version}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white font-semibold">{record.devicesTestedCount}</span>
                      </td>
                      <td className="py-3 px-4">
                        {record.status === 'completed' ? (
                          <span className={`font-bold text-lg ${getCompatibilityColor(record.compatibility)}`}>
                            {record.compatibility}%
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-sm">
                        {record.testDuration || '-'}
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-sm">{record.uploadTime}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400'
                            : record.status === 'testing'
                            ? 'bg-blue-500/20 text-blue-400'
                            : record.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {record.status === 'completed' && (
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Report
                            </Button>
                          )}
                        </div>
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
