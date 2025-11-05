'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building2, MapPin, Smartphone, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { User as UserType } from '@/types';

export default function UserDashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      label: 'Protect Version',
      value: user.protectVersion || 'Customized',
      icon: Shield,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      label: 'Android Times',
      value: `${user.androidTimes || 45} Times`,
      icon: Smartphone,
      color: 'from-green-600 to-emerald-500',
    },
    {
      label: 'iOS Times',
      value: `${user.iosTimes || 50} Times`,
      icon: Smartphone,
      color: 'from-purple-600 to-pink-500',
    },
    {
      label: 'User Type',
      value: 'Free User',
      icon: User,
      color: 'from-orange-600 to-red-500',
    },
  ];

  const userInfo = [
    { label: 'Protect Version', value: user.protectVersion || 'Customized', icon: Shield },
    { label: 'Country', value: user.country || 'Vietnam', icon: MapPin },
    { label: 'Last Name', value: user.lastName, icon: User },
    { label: 'First Name', value: user.firstName, icon: User },
    { label: 'Mobile', value: user.mobile || 'N/A', icon: Smartphone },
    { label: 'Email', value: user.email, icon: Mail },
    { label: 'Company Name', value: user.companyName || 'ICSS', icon: Building2 },
    { label: 'Position', value: user.position || '專員', icon: User },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user.firstName}! 👋
        </h1>
        <p className="text-slate-400">
          Here's your account overview and security statistics
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
                <CardTitle>Member Center</CardTitle>
                <p className="text-slate-400 mt-1">Your account information</p>
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
            <CardTitle>Times Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Android</span>
                  <span className="text-white font-semibold">{user.androidTimes || 45} Times</span>
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
                  <span className="text-white font-semibold">{user.iosTimes || 50} Times</span>
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
