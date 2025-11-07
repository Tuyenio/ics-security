'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, RefreshCw, Apple, CheckCircle, Upload } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { UploadedFile } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function iOSProtectPage() {
  const { t } = useLanguage();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [timesRemaining, setTimesRemaining] = useState(50);

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

  const handleRefresh = () => {
    console.log('Refreshing...');
  };

  const handleFileUpload = () => {
    console.log('Upload iOS app...');
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">{t('user.iosProtect.title')}</h1>
        <p className="text-slate-400">
          {t('user.iosProtect.subtitle')}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glass>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('user.iosProtect.uploadTitle')}</CardTitle>
                <CardDescription>{t('user.iosProtect.remainingTimes')}: <span className="text-white font-semibold">{timesRemaining}</span></CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('user.iosProtect.refresh')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer"
              onClick={handleFileUpload}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{t('user.iosProtect.uploadPrompt')}</p>
                  <p className="text-sm text-slate-400">
                    {t('user.iosProtect.dragDrop')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>{t('user.iosProtect.historyTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.iosProtect.table.filename')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.iosProtect.table.fileSize')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.iosProtect.table.version')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.iosProtect.table.createTime')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.iosProtect.table.finishTime')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.iosProtect.table.status')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('user.iosProtect.table.download')}</th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12">
                        <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">{t('user.iosProtect.noFiles')}</p>
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
                        <td className="py-3 px-4 text-slate-300">{formatFileSize(file.fileSize)}</td>
                        <td className="py-3 px-4 text-slate-300">{file.version}</td>
                        <td className="py-3 px-4 text-slate-300 text-sm">{formatDateTime(file.createTime)}</td>
                        <td className="py-3 px-4 text-slate-300 text-sm">
                          {file.finishTime ? formatDateTime(file.finishTime) : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/50 inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {t('user.iosProtect.completed')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            {t('user.iosProtect.download')}
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
