'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Smartphone, RefreshCw, Download, FileImage } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { UploadedFile } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CompatibilityPage() {
  const { t } = useLanguage();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [timesRemaining, setTimesRemaining] = useState(1);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validExtensions = ['.apk', '.aab'];
    const isValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!isValid) {
      alert('Please upload an APK or AAB file');
      return;
    }

    // Validate file size (2GB max)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      alert('File size must be less than 2GB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/compatibility/upload', {
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
          version: data.version || '1.0.0',
          icon: data.icon,
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/50',
      failed: 'bg-red-500/20 text-red-400 border-red-500/50',
      processing: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles] || styles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">{t('user.compatibility.title')}</h1>
        <p className="text-slate-400">
          {t('user.compatibility.subtitle')}
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
                <CardTitle>{t('user.compatibility.uploadTitle')}</CardTitle>
                <CardDescription>{t('user.compatibility.timesRemaining')}: {timesRemaining}</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('user.compatibility.refresh')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-cyan-500 transition-colors">
              <input
                type="file"
                id="file-upload-compat"
                className="hidden"
                accept=".apk,.aab"
                onChange={handleFileUpload}
                disabled={isUploading || timesRemaining === 0}
              />
              <label
                htmlFor="file-upload-compat"
                className={`cursor-pointer ${timesRemaining === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      {isUploading ? t('user.compatibility.uploading') : t('user.compatibility.uploadPrompt')}
                    </p>
                    <p className="text-sm text-slate-400">
                      {t('user.compatibility.fileFormat')}
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-cyan-300 font-medium mb-2">{t('user.compatibility.importantNotes')}</p>
              <ul className="text-sm text-cyan-200 space-y-1 list-disc list-inside">
                <li>{t('user.compatibility.note1')}</li>
                <li>{t('user.compatibility.note2')}</li>
                <li>{t('user.compatibility.note3')}</li>
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
            <CardTitle>{t('user.compatibility.historyTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.filename')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.icon')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.fileSize')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.version')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.createTime')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.finishTime')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.status')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.compatibility.table.report')}</th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12">
                        <Smartphone className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">{t('user.compatibility.noFiles')}</p>
                      </td>
                    </tr>
                  ) : (
                    files.map((file) => (
                      <tr key={file.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                        <td className="py-3 px-4 text-white">{file.filename}</td>
                        <td className="py-3 px-4">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                            <FileImage className="w-6 h-6 text-slate-400" />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{formatFileSize(file.fileSize)}</td>
                        <td className="py-3 px-4 text-slate-300">{file.version || '-'}</td>
                        <td className="py-3 px-4 text-slate-300">
                          {new Date(file.createTime).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {file.finishTime ? new Date(file.finishTime).toLocaleString() : '-'}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(file.status)}
                        </td>
                        <td className="py-3 px-4">
                          {file.status === 'completed' && file.reportUrl ? (
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              {t('user.compatibility.download')}
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
