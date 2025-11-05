'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileCode2,
  Smartphone,
  Shield,
  Lock,
  ShieldCheck,
  Bug,
  User,
  KeyRound,
  Users,
  BarChart3,
  Settings,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
}

interface SidebarProps {
  role: 'admin' | 'user';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();

  const userMenuItems: MenuItem[] = [
    { icon: User, label: 'User Center', href: '/user/dashboard' },
    { icon: FileCode2, label: 'Source Code Analysis', href: '/user/source-code-analysis' },
    { icon: Smartphone, label: 'Compatibility', href: '/user/compatibility' },
    { icon: Shield, label: 'AppTotalGo', href: '/user/app-total-go' },
    { icon: Lock, label: 'APK Protect', href: '/user/apk-protect' },
    { icon: ShieldCheck, label: 'iOS Protect', href: '/user/ios-protect' },
    { icon: Bug, label: 'Malware Intelligence', href: '/user/malware-intelligence' },
    { icon: KeyRound, label: 'Change Password', href: '/user/change-password' },
  ];

  const adminMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'User Management', href: '/admin/users' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: FileCode2, label: 'Source Code Analysis', href: '/admin/source-code-analysis' },
    { icon: Smartphone, label: 'Compatibility', href: '/admin/compatibility' },
    { icon: Shield, label: 'AppTotalGo', href: '/admin/app-total-go' },
    { icon: Lock, label: 'APK Protect', href: '/admin/apk-protect' },
    { icon: ShieldCheck, label: 'iOS Protect', href: '/admin/ios-protect' },
    { icon: Bug, label: 'Malware Intelligence', href: '/admin/malware-intelligence' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 glass border-r border-slate-800 h-[calc(100vh-4rem)] overflow-y-auto"
    >
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'hover:bg-slate-800/50',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-l-4 border-blue-500 text-white'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 bg-cyan-500 text-white text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
