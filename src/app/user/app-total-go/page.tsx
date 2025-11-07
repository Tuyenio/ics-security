'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Shield, Download, RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppFile {
  id: string;
  filename: string;
  fileSize: string;
  version: string;
  createTime: string;
  finishTime: string;
  status: 'completed' | 'failed';
  errorMessage?: string;
}

export default function AppTotalGoPage() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [timesRemaining, setTimesRemaining] = useState(10);
  const [files, setFiles] = useState<AppFile[]>([
    {
      id: '1',
      filename: 'Woori_bank.apk',
      fileSize: '103.49M',
      version: '2.0.94',
      createTime: '2025-09-22 21:00:23',
      finishTime: '2025-10-27 11:20:31',
      status: 'completed',
    },
    {
      id: '2',
      filename: 'lp_sign.apk',
      fileSize: '167.22M',
      version: '4.1.9',
      createTime: '2025-09-21 13:10:37',
      finishTime: '2025-09-21 13:21:05',
      status: 'completed',
    },
    {
      id: '3',
      filename: 'Upload Error',
      fileSize: '',
      version: '',
      createTime: '2025-09-21 12:27:15',
      finishTime: '',
      status: 'failed',
      errorMessage: 'API Request Failed: Unknown error',
    },
    {
      id: '4',
      filename: 'shb_merged.apk',
      fileSize: '79.93M',
      version: '5.24.4',
      createTime: '2025-09-18 18:26:49',
      finishTime: '2025-09-18 18:50:15',
      status: 'completed',
    },
    {
      id: '5',
      filename: 'app-release.apk',
      fileSize: '6.27M',
      version: '1.0',
      createTime: '2025-09-09 10:49:25',
      finishTime: '2025-09-09 11:10:09',
      status: 'completed',
    },
  ]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(files.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = files.slice(startIndex, startIndex + itemsPerPage);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validExtensions = ['.apk', '.aab', '.ipa'];
    const isValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!isValid) {
      alert('Please upload an APK, AAB, or IPA file');
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

      const response = await fetch('/api/app-total-go/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newFile: AppFile = {
          id: data.id || Date.now().toString(),
          filename: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + 'M',
          version: data.version || '1.0.0',
          createTime: new Date().toLocaleString('en-US', { 
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
          }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2'),
          finishTime: '',
          status: 'completed',
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
    console.log('Refreshing...');
  };

  const handleDownload = (file: AppFile) => {
    console.log('Downloading report:', file.filename);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">{t('user.appTotalGo.title')}</h1>
        <p className="text-slate-400">
          {t('user.appTotalGo.subtitle')}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glass>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('user.appTotalGo.uploadTitle')}</CardTitle>
                <CardDescription>{t('user.appTotalGo.timesRemaining')}: {timesRemaining}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('user.appTotalGo.refresh')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-cyan-500 transition-colors">
              <input
                type="file"
                id="file-upload-app-total"
                className="hidden"
                accept=".apk,.aab,.ipa"
                onChange={handleFileUpload}
                disabled={isUploading || timesRemaining === 0}
              />
              <label
                htmlFor="file-upload-app-total"
                className={`cursor-pointer ${timesRemaining === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      {isUploading ? t('user.appTotalGo.uploading') : t('user.appTotalGo.uploadPrompt')}
                    </p>
                    <p className="text-sm text-slate-400">
                      {t('user.appTotalGo.fileFormat')}
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-cyan-300 font-medium mb-2">{t('user.appTotalGo.importantNotes')}</p>
              <ul className="text-sm text-cyan-200 space-y-1 list-disc list-inside">
                <li>{t('user.appTotalGo.note1')}</li>
                <li>{t('user.appTotalGo.note2')}</li>
                <li>{t('user.appTotalGo.note3')}</li>
                <li>{t('user.appTotalGo.note4')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50">
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">{t('user.appTotalGo.table.filename')}</th>
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">{t('user.appTotalGo.table.fileSize')}</th>
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">{t('user.appTotalGo.table.version')}</th>
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">{t('user.appTotalGo.table.createTime')}</th>
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">{t('user.appTotalGo.table.finishTime')}</th>
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">{t('user.appTotalGo.table.status')}</th>
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">{t('user.appTotalGo.table.report')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFiles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">{t('user.appTotalGo.noFiles')}</p>
                      </td>
                    </tr>
                  ) : (
                    paginatedFiles.map((file, index) => (
                      <motion.tr
                        key={file.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-800 hover:bg-slate-800/30"
                      >
                        <td className="py-4 px-6">
                          {file.status === 'failed' ? (
                            <div>
                              <p className="text-red-400 font-medium">{file.filename}</p>
                              {file.errorMessage && (
                                <p className="text-xs text-red-400/70 mt-1">{file.errorMessage}</p>
                              )}
                            </div>
                          ) : (
                            <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
                              {file.filename}
                            </a>
                          )}
                        </td>
                        <td className="py-4 px-6 text-slate-300">{file.fileSize || '-'}</td>
                        <td className="py-4 px-6 text-slate-300">{file.version || '-'}</td>
                        <td className="py-4 px-6 text-slate-300 text-sm">{file.createTime}</td>
                        <td className="py-4 px-6 text-slate-300 text-sm">{file.finishTime || '-'}</td>
                        <td className="py-4 px-6">
                          {file.status === 'completed' ? (
                            <span className="px-3 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400 inline-flex items-center gap-1">
                              {t('user.appTotalGo.completed')}
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400 inline-flex items-center gap-1">
                              {t('user.appTotalGo.failure')}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {file.status === 'completed' ? (
                            <Button
                              variant="primary"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleDownload(file)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              {t('user.appTotalGo.download')}
                            </Button>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-6 border-t border-slate-800">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
