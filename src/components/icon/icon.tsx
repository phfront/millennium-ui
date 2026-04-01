'use client';

import React, { forwardRef, lazy, Suspense } from 'react';
import type { LucideProps } from 'lucide-react';
import { icons } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 16, color, className = '', ...props }, ref) => {
    const LucideIcon = icons[name as keyof typeof icons];
    if (!LucideIcon) {
      console.warn(`[nexus-ui] Icon "${name}" not found in lucide-react`);
      return null;
    }
    return (
      <LucideIcon
        ref={ref}
        size={size}
        color={color}
        className={className}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

Icon.displayName = 'Icon';
