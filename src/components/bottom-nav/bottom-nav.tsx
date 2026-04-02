'use client';

import React, { forwardRef } from 'react';

export interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  items: BottomNavItem[];
}

export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  ({ items, className = '', ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Navegação inferior"
      className={[
        'flex items-center bg-surface-2 border-t border-border',
        'safe-area-inset-bottom',
        className,
      ].join(' ')}
      {...props}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={item.isActive ? 'page' : undefined}
          aria-label={item.label}
          className={[
            'flex-1 flex flex-col items-center gap-1 py-3 px-2 cursor-pointer',
            'text-xs font-medium transition-colors duration-[var(--transition-fast)]',
            'focus-visible:outline-none focus-visible:bg-surface-3',
            item.isActive ? 'text-brand-primary' : 'text-text-muted hover:text-text-secondary',
          ].join(' ')}
        >
          <span
            className={[
              'transition-transform duration-[var(--transition-fast)]',
              item.isActive ? 'scale-110' : '',
            ].join(' ')}
          >
            {item.icon}
          </span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  ),
);

BottomNav.displayName = 'BottomNav';
