'use client';

import React, { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';
import { icons } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  /** Ícone Lucide usado quando `name` não existe no mapa (ex.: `"Box"`). */
  fallbackName?: string;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, fallbackName, size = 16, color, className = '', ...props }, ref) => {
    let resolved: string | null = null;
    if (icons[name as keyof typeof icons]) resolved = name;
    else if (fallbackName && icons[fallbackName as keyof typeof icons]) resolved = fallbackName;

    const LucideIcon = resolved ? icons[resolved as keyof typeof icons] : null;

    if (!LucideIcon) {
      console.warn(
        `[nexus-ui] Icon "${name}" not found in lucide-react` +
          (fallbackName ? ` (fallback "${fallbackName}" também inválido)` : ''),
      );
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
