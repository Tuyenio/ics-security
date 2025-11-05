'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Clock, CheckCircle, Search, Filter, Download, Eye, Apple } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProtectionRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  filename: string;
  fileSize: string;
  bundleId: string;
  version: string;
  minIOSVersion: string;
  protectionLevel: 'Basic' | 'Standard' | 'Advanced' | 'Maximum';
  features: string[];
  remainingTimes: number;
  uploadTime: string;
  completionTime: string;
  status: 'completed' | 'processing' | 'failed' | 'pending';
}

export default function AdminIosProtectPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing' | 'failed' | 'pending'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [records] = useState<ProtectionRecord[]>([
    {
      id: '1',
      userId: 'u001',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      filename: 'MyApp.ipa',
      fileSize: '67.3M',
      bundleId: 'com.example.myapp',
      version: '1.5.2',
      minIOSVersion: '14.0',
      protectionLevel: 'Maximum',
      features: ['Code Obfuscation', 'Anti-Debug', 'Jailbreak Detection', 'String Encryption'],
      remainingTimes: 12,
      uploadTime: '2025-10-27 10:15:30',
      completionTime: '2025-10-27 10:32:45',
      status: 'completed',
    },
    {
      id: '2',
      userId: 'u002',
      userName: 'Jane Smith',
      userEmail: 'jane.smith@example.com',
      filename: 'BankingApp.ipa',
      fileSize: '89.7M',
      bundleId: 'com.bank.secureiOS',
      version: '3.2.1',
      minIOSVersion: '15.0',
      protectionLevel: 'Advanced',
      features: ['Code Obfuscation', 'Anti-Debug', 'Jailbreak Detection'],
      remainingTimes: 7,
      uploadTime: '2025-10-26 15:45:20',
      completionTime: '2025-10-26 16:05:10',
      status: 'completed',
    },
    {
      id: '3',
      userId: 'u003',
      userName: 'Mike Johnson',
      userEmail: 'mike.j@example.com',
      filename: 'ShoppingApp-v2.ipa',
      fileSize: '54.2M',
      bundleId: 'com.shop.ios',
      version: '2.0.5',
      minIOSVersion: '13.0',
      protectionLevel: 'Standard',
      features: ['Code Obfuscation', 'String Encryption'],
      remainingTimes: 0,
      uploadTime: '2025-10-25 12:30:15',
      completionTime: '',
      status: 'processing',
    },
    {
      id: '4',
      userId: 'u004',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.w@example.com',
      filename: 'GameApp.ipa',
      fileSize: '145.8M',
      bundleId: 'com.game.ios',
      version: '1.0.3',
      minIOSVersion: '16.0',
      protectionLevel: 'Basic',
      features: ['Code Obfuscation'],
      remainingTimes: 20,
      uploadTime: '2025-10-24 18:20:40',
      completionTime: '2025-10-24 18:45:22',
      status: 'completed',
    },
  ]);

  const stats = [
    { 
      label: 'Total Protections', 
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
      label: 'Processing', 
      value: records.filter(r => r.status === 'processing').length, 
      color: 'from-yellow-600 to-orange-500', 
      icon: Clock 
    },
    { 
      label: 'Completed Today', 
      value: records.filter(r => r.status === 'completed' && r.completionTime.includes('2025-10-27')).length, 
      color: 'from-green-600 to-emerald-500', 
      icon: CheckCircle 
    },
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.bundleId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getProtectionColor = (level: string) => {
    switch (level) {
      case 'Maximum': return 'bg-purple-500/20 text-purple-400';
      case 'Advanced': return 'bg-blue-500/20 text-blue-400';
      case 'Standard': return 'bg-green-500/20 text-green-400';
      case 'Basic': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">iOS Protect Management</h1>
            <p className="text-slate-400">
              Monitor and manage all iOS application protection jobs
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
                  placeholder="Search by user, email, filename, or bundle ID..."
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
                  <option value="pending">Pending</option>
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
            <CardTitle>Protection Records ({filteredRecords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">IPA Details</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">iOS Version</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Protection Level</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Features</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Remaining Times</th>
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
                          <div className="flex items-center gap-2">
                            <Apple className="w-4 h-4 text-slate-400" />
                            <p className="text-blue-400 font-medium">{record.filename}</p>
                          </div>
                          <p className="text-xs text-slate-500">{record.bundleId}</p>
                          <p className="text-xs text-slate-500">v{record.version} • {record.fileSize}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                          iOS {record.minIOSVersion}+
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getProtectionColor(record.protectionLevel)}`}>
                          {record.protectionLevel}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {record.features.map((feature, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${
                          record.remainingTimes > 10 
                            ? 'text-green-400'
                            : record.remainingTimes > 0 
                            ? 'text-yellow-400' 
                            : 'text-red-400'
                        }`}>
                          {record.remainingTimes}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-sm">{record.uploadTime}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400'
                            : record.status === 'processing'
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
                              Download
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
