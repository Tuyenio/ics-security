'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const stats = [
    { label: t('admin.analytics.stats.totalUploads'), value: '1,234', change: '+23%', trend: 'up' },
    { label: t('admin.analytics.stats.activeUsers'), value: '156', change: '+12%', trend: 'up' },
    { label: t('admin.analytics.stats.threatsDetected'), value: '47', change: '-15%', trend: 'down' },
    { label: t('admin.analytics.stats.successRate'), value: '94.5%', change: '+2.3%', trend: 'up' },
  ];

  const serviceMetrics = [
    { service: 'Source Code Analysis', total: 324, completed: 310, failed: 14, avgTime: '4.2 min' },
    { service: 'Compatibility Testing', total: 289, completed: 275, failed: 14, avgTime: '8.5 min' },
    { service: 'APK Protect', total: 245, completed: 240, failed: 5, avgTime: '2.1 min' },
    { service: 'iOS Protect', total: 198, completed: 195, failed: 3, avgTime: '3.7 min' },
    { service: 'Malware Intelligence', total: 178, completed: 178, failed: 0, avgTime: 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{t('admin.analytics.title')}</h1>
            <p className="text-slate-400">{t('admin.analytics.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">{t('admin.analytics.timeRange.7d')}</option>
              <option value="30d">{t('admin.analytics.timeRange.30d')}</option>
              <option value="90d">{t('admin.analytics.timeRange.90d')}</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              {t('admin.analytics.exportReport')}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
                } flex items-center justify-center`}>
                  <TrendingUp className={`w-5 h-5 ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400 rotate-180'
                  }`} />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Service Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.analytics.servicePerformance.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('admin.analytics.servicePerformance.table.service')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('admin.analytics.servicePerformance.table.total')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('admin.analytics.servicePerformance.table.completed')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('admin.analytics.servicePerformance.table.failed')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('admin.analytics.servicePerformance.table.successRate')}</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">{t('admin.analytics.servicePerformance.table.avgTime')}</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceMetrics.map((metric, index) => {
                    const successRate = ((metric.completed / metric.total) * 100).toFixed(1);
                    return (
                      <motion.tr
                        key={metric.service}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="border-b border-slate-800 hover:bg-slate-800/30"
                      >
                        <td className="py-3 px-4 text-white font-medium">{metric.service}</td>
                        <td className="py-3 px-4 text-slate-300">{metric.total}</td>
                        <td className="py-3 px-4 text-green-400">{metric.completed}</td>
                        <td className="py-3 px-4 text-red-400">{metric.failed}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden max-w-[100px]">
                              <div
                                className="h-full bg-gradient-to-r from-green-600 to-emerald-500"
                                style={{ width: `${successRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-white">{successRate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{metric.avgTime}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.analytics.charts.uploadTrends')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">{t('admin.analytics.charts.chartPlaceholder')}</p>
                  <p className="text-sm text-slate-500 mt-1">{t('admin.analytics.charts.integrateChart')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.analytics.charts.userActivity')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">{t('admin.analytics.charts.chartPlaceholder')}</p>
                  <p className="text-sm text-slate-500 mt-1">{t('admin.analytics.charts.integrateChart')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
