'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileCode2, RefreshCw, Download, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { UploadedFile } from '@/types';

export default function SourceCodeAnalysisPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [timesRemaining, setTimesRemaining] = useState(1);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.zip')) {
      alert('Please upload a ZIP file');
      return;
    }

    // Validate file size (2GB max)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      alert('File size must be less than 2GB');
      return;
    }

    setIsUploading(true);

    try {
      // TODO: Replace with actual API call
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/source-code-analysis/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newFile: UploadedFile = {
          id: data.id || Date.now().toString(),
          filename: file.name,
          fileSize: file.size,
          status: 'processing',
          createTime: new Date().toISOString(),
        };
        setFiles([newFile, ...files]);
        setTimesRemaining(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRefresh = () => {
    // TODO: Fetch latest files from API
    console.log('Refreshing...');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'processing':
        return <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="text-green-400">Completed</span>;
      case 'failed':
        return <span className="text-red-400">Failed</span>;
      case 'processing':
        return <span className="text-blue-400">Processing</span>;
      default:
        return <span className="text-yellow-400">Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Source Code Analysis</h1>
        <p className="text-slate-400">
          Reduce information security risks in the development stage through the analysis and discrimination of test reports.
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card glass>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upload Source Code</CardTitle>
                <CardDescription>Times Remaining: {timesRemaining}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".zip"
                onChange={handleFileUpload}
                disabled={isUploading || timesRemaining === 0}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${timesRemaining === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-slate-400">
                      ZIP files only (Max 2GB)
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300 font-medium mb-2">Important Notes:</p>
              <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                <li>The file upload size is limited to 2 GB or less.</li>
                <li>Only ZIP format is supported.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Files Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Analysis History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Filename</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">File Size</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Create Time</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Finish Time</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Report</th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12">
                        <FileCode2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">No files uploaded yet</p>
                      </td>
                    </tr>
                  ) : (
                    files.map((file) => (
                      <tr key={file.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                        <td className="py-3 px-4 text-white">{file.filename}</td>
                        <td className="py-3 px-4 text-slate-300">{formatFileSize(file.fileSize)}</td>
                        <td className="py-3 px-4 text-slate-300">
                          {new Date(file.createTime).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {file.finishTime ? new Date(file.finishTime).toLocaleString() : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(file.status)}
                            {getStatusText(file.status)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {file.status === 'completed' && file.reportUrl ? (
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                      </tr>
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
