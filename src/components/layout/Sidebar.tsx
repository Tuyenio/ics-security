'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

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
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      animate={{ x: 0, width: isCollapsed ? '64px' : '240px' }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="glass border-r border-slate-800 h-screen overflow-y-auto relative flex-shrink-0"
    >
      {/* Logo Section */}
      <div className="h-14 px-3 border-b border-slate-800 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push(role === 'admin' ? '/admin/dashboard' : '/user/dashboard')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Logo size="xs" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors ml-auto"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      <nav className="p-2 space-y-0.5">
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
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group',
                  'hover:bg-slate-800/50',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-l-4 border-blue-500 text-white'
                    : 'text-slate-400 hover:text-white'
                )}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !isCollapsed && (
                  <span className="ml-auto px-2 py-0.5 bg-cyan-500 text-white text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                    {item.label}
                  </div>
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
