'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const dimensions = {
    xs: { width: 70, height: 23 },      // Extra small for compact sidebar
    sm: { width: 90, height: 30 },      // Small for sidebar
    md: { width: 120, height: 40 },     // Reduced for landing nav
    lg: { width: 170, height: 57 },     // Reduced for login pages
    xl: { width: 210, height: 70 },     // Reduced for special cases
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/ics-logo.png"
        alt="ICS Cyber Security"
        width={dimensions[size].width}
        height={dimensions[size].height}
        priority
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
