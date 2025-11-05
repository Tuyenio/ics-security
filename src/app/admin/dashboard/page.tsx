'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Shield, TrendingUp, FileCode2, Smartphone, Bug } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { User } from '@/types';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setAdmin(JSON.parse(userData));
    }
  }, []);

  const stats = [
    {
      label: 'Total Users',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      label: 'Active Sessions',
      value: '89',
      change: '+8%',
      icon: Activity,
      color: 'from-green-600 to-emerald-500',
    },
    {
      label: 'Total Scans',
      value: '1,234',
      change: '+23%',
      icon: Shield,
      color: 'from-purple-600 to-pink-500',
    },
    {
      label: 'Threats Detected',
      value: '47',
      change: '-15%',
      icon: Bug,
      color: 'from-red-600 to-orange-500',
    },
  ];

  const serviceUsage = [
    { name: 'Source Code Analysis', count: 324, icon: FileCode2, color: 'bg-blue-500' },
    { name: 'Compatibility Testing', count: 289, icon: Smartphone, color: 'bg-cyan-500' },
    { name: 'APK Protect', count: 245, icon: Shield, color: 'bg-green-500' },
    { name: 'iOS Protect', count: 198, icon: Shield, color: 'bg-purple-500' },
    { name: 'Malware Intelligence', count: 178, icon: Bug, color: 'bg-red-500' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Uploaded APK for protection', time: '2 minutes ago' },
    { user: 'Jane Smith', action: 'Completed compatibility test', time: '15 minutes ago' },
    { user: 'Mike Johnson', action: 'Downloaded analysis report', time: '1 hour ago' },
    { user: 'Sarah Williams', action: 'Created new user account', time: '2 hours ago' },
    { user: 'Tom Brown', action: 'Updated security settings', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, Admin {admin?.firstName}! 🚀
        </h1>
        <p className="text-slate-400">
          Here's an overview of your security platform performance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Usage */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Service Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceUsage.map((service, index) => {
                  const Icon = service.icon;
                  const maxCount = Math.max(...serviceUsage.map(s => s.count));
                  const percentage = (service.count / maxCount) * 100;
                  
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg ${service.color} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-slate-300">{service.name}</span>
                            <span className="text-sm font-semibold text-white">{service.count}</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              className={`h-full ${service.color}`}
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 pb-4 border-b border-slate-800 last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{activity.user}</p>
                      <p className="text-sm text-slate-400">{activity.action}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
