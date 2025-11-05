'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md', showText = true }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'relative flex items-center justify-center rounded-xl',
        'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700',
        'shadow-lg shadow-blue-500/50',
        sizes[size]
      )}>
        <Shield className="w-2/3 h-2/3 text-white" strokeWidth={2.5} />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-white/20"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            'font-bold text-white tracking-tight leading-none',
            textSizes[size]
          )}>
            ICS
          </span>
          <span className="text-xs text-cyan-400 font-medium tracking-wider">
            SECURITY
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
