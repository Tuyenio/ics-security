'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Download, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { UploadedFile } from '@/types';

export default function APKProtectPage() {
  const [timesRemaining, setTimesRemaining] = useState(45);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      filename: 'VLTK_mobile_merged.apk',
      fileSize: 157.33 * 1024 * 1024,
      version: '1.0.1',
      icon: '🎮',
      status: 'completed',
      createTime: '2025-07-11T10:09:31',
      finishTime: '2025-07-11T10:11:11',
    },
    {
      id: '2',
      filename: 'MediPay_UAT.sec.apk',
      fileSize: 204.42 * 1024 * 1024,
      version: '2.0.2',
      icon: '💊',
      status: 'completed',
      createTime: '2025-07-10T18:09:45',
      finishTime: '2025-07-10T18:10:45',
    },
    {
      id: '3',
      filename: 'MyVN_Post.sec.apk',
      fileSize: 27.48 * 1024 * 1024,
      version: '1.0.37',
      icon: '📮',
      status: 'completed',
      createTime: '2025-07-07T10:20:53',
      finishTime: '2025-07-07T10:23:15',
    },
    {
      id: '4',
      filename: 'BIDV.sec.apk',
      fileSize: 182.63 * 1024 * 1024,
      version: '5.2.65',
      icon: '🏦',
      status: 'completed',
      createTime: '2025-07-03T18:08:06',
      finishTime: '2025-07-03T18:11:11',
    },
    {
      id: '5',
      filename: 'base.apk',
      fileSize: 56.13 * 1024 * 1024,
      version: '2.1.20',
      icon: '📱',
      status: 'completed',
      createTime: '2025-06-25T14:12:53',
      finishTime: '2025-06-25T14:15:06',
    },
  ]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + sizes[i];
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '');
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setTimesRemaining(prev => prev - 1);
    }, 2000);
  };

  const handleRefresh = () => {
    // Simulate refresh
    console.log('Refreshing...');
  };

  const handleDownload = (file: UploadedFile) => {
    console.log('Downloading:', file.filename);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">APK Protect</h1>
        <p className="text-slate-400">
          Protect the app's security through data and code encryption, prevention of dynamic memory loading, and detection of hacking tools.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glass>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Protect Android Application</CardTitle>
                <CardDescription>Remaining Times: <span className="text-white font-semibold">{timesRemaining}</span></CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="primary" size="sm" className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Signature Tool
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer"
              onClick={handleFileUpload}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Upload APK File</p>
                  <p className="text-sm text-slate-400">Drag and drop or click to upload</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Protection History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Filename</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Icon</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">File Size</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Version</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Createtime</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Finishtime</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12">
                        <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">No protected applications yet</p>
                      </td>
                    </tr>
                  ) : (
                    files.map((file, index) => (
                      <motion.tr
                        key={file.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-800 hover:bg-slate-800/30"
                      >
                        <td className="py-3 px-4">
                          <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
                            {file.filename}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-10 h-10 flex items-center justify-center text-2xl">
                            {file.icon}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{formatFileSize(file.fileSize)}</td>
                        <td className="py-3 px-4 text-slate-300">{file.version}</td>
                        <td className="py-3 px-4 text-slate-300 text-sm">{formatDateTime(file.createTime)}</td>
                        <td className="py-3 px-4 text-slate-300 text-sm">
                          {file.finishTime ? formatDateTime(file.finishTime) : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/50 inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Completed
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleDownload(file)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
