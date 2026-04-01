import React, { forwardRef } from 'react';
import { InboxIcon } from 'lucide-react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'flex flex-col items-center justify-center gap-4 py-16 px-8 text-center',
        className,
      ].join(' ')}
      {...props}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-3 text-text-muted">
        {icon ?? <InboxIcon size={32} />}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-text-primary">{title}</p>
        {description && <p className="text-sm text-text-secondary">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  ),
);

EmptyState.displayName = 'EmptyState';
