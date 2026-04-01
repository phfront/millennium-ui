import React, { forwardRef } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'muted';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success-bg text-success border border-success-border',
  warning: 'bg-warning-bg text-warning border border-warning-border',
  danger: 'bg-danger-bg text-danger border border-danger-border',
  info: 'bg-info-bg text-info border border-info-border',
  muted: 'bg-surface-3 text-text-muted border border-border',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'muted', size = 'md', className = '', children, ...props }, ref) => (
    <span
      ref={ref}
      className={[
        'inline-flex items-center gap-1 font-medium rounded-full leading-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  ),
);

Badge.displayName = 'Badge';
