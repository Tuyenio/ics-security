'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building2, MapPin, Smartphone, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { User as UserType } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UserDashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      label: t('user.dashboard.stats.protectVersion'),
      value: user.protectVersion || 'Customized',
      icon: Shield,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      label: t('user.dashboard.stats.androidTimes'),
      value: `${user.androidTimes || 45} ${t('user.dashboard.times')}`,
      icon: Smartphone,
      color: 'from-green-600 to-emerald-500',
    },
    {
      label: t('user.dashboard.stats.iosTimes'),
      value: `${user.iosTimes || 50} ${t('user.dashboard.times')}`,
      icon: Smartphone,
      color: 'from-purple-600 to-pink-500',
    },
    {
      label: t('user.dashboard.stats.userType'),
      value: t('user.dashboard.freeUser'),
      icon: User,
      color: 'from-orange-600 to-red-500',
    },
  ];

  const userInfo = [
    { label: t('user.dashboard.info.protectVersion'), value: user.protectVersion || 'Customized', icon: Shield },
    { label: t('user.dashboard.info.country'), value: user.country || 'Vietnam', icon: MapPin },
    { label: t('user.dashboard.info.lastName'), value: user.lastName, icon: User },
    { label: t('user.dashboard.info.firstName'), value: user.firstName, icon: User },
    { label: t('user.dashboard.info.mobile'), value: user.mobile || 'N/A', icon: Smartphone },
    { label: t('user.dashboard.info.email'), value: user.email, icon: Mail },
    { label: t('user.dashboard.info.companyName'), value: user.companyName || 'ICSS', icon: Building2 },
    { label: t('user.dashboard.info.position'), value: user.position || '專員', icon: User },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('user.dashboard.title')}, {user.firstName}! 👋
        </h1>
        <p className="text-slate-400">
          {t('user.dashboard.subtitle')}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card glass>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle>{t('user.dashboard.memberCenter')}</CardTitle>
                <p className="text-slate-400 mt-1">{t('user.dashboard.memberCenterSubtitle')}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-400">{info.label}</p>
                      <p className="text-base font-medium text-white truncate">{info.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Times Remaining */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{t('user.dashboard.timesRemaining')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Android</span>
                  <span className="text-white font-semibold">{user.androidTimes || 45} {t('user.dashboard.times')}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-emerald-500"
                    style={{ width: `${((user.androidTimes || 45) / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">iOS</span>
                  <span className="text-white font-semibold">{user.iosTimes || 50} {t('user.dashboard.times')}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                    style={{ width: `${((user.iosTimes || 50) / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
