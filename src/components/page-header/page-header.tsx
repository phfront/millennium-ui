import React, { forwardRef } from 'react';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, subtitle, actions, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={['flex items-start justify-between gap-4 mb-6', className].join(' ')}
      {...props}
    >
      <div>
        <h1 className="text-2xl font-bold text-text-primary leading-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  ),
);

PageHeader.displayName = 'PageHeader';
