'use client';

import React, { forwardRef } from 'react';

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ icon, label, isActive = false, isCollapsed = false, className = '', ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? label : undefined}
      className={[
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
        'transition-[background-color,color] duration-[var(--transition-fast)]',
        'focus-visible:outline-none focus-visible:shadow-glow-brand',
        isActive
          ? 'bg-brand-primary/10 text-brand-primary'
          : 'text-text-secondary hover:bg-surface-3 hover:text-text-primary',
        isCollapsed ? 'justify-center' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {icon && (
        <span className={['shrink-0', isActive ? 'text-brand-primary' : ''].join(' ')}>
          {icon}
        </span>
      )}
      {!isCollapsed && <span className="truncate">{label}</span>}
      {isActive && !isCollapsed && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
      )}
    </a>
  ),
);

NavItem.displayName = 'NavItem';
