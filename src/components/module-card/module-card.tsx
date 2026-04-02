import React, { forwardRef } from 'react';
import { Badge, type BadgeVariant } from '../badge/badge';
import { LockIcon } from 'lucide-react';

export interface ModuleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  label: string;
  description?: string;
  status?: 'active' | 'soon' | 'beta';
  href?: string;
  isDisabled?: boolean;
}

const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  active: { label: 'Ativo', variant: 'success' },
  soon: { label: 'Em breve', variant: 'muted' },
  beta: { label: 'Beta', variant: 'info' },
};

export const ModuleCard = forwardRef<HTMLDivElement, ModuleCardProps>(
  ({ icon, label, description, status, href, isDisabled = false, className = '', onClick, ...props }, ref) => {
    const isClickable = !isDisabled && (href || onClick);
    const statusInfo = status ? statusConfig[status] : undefined;

    const inner = (
      <div
        ref={ref}
        className={[
          'group relative flex flex-col gap-3 rounded-xl p-5',
          'bg-surface-2 border border-border',
          'transition-all duration-[var(--transition-base)]',
          isClickable
            ? 'cursor-pointer hover:border-brand-primary hover:shadow-glow-brand hover:-translate-y-0.5'
            : '',
          isDisabled ? 'opacity-60 cursor-not-allowed' : '',
          className,
        ].join(' ')}
        onClick={!isDisabled ? onClick : undefined}
        {...props}
      >
        {/* Icon */}
        <div
          className={[
            'flex items-center justify-center w-11 h-11 rounded-lg',
            'bg-brand-primary/10 text-brand-primary',
            'transition-colors duration-[var(--transition-fast)]',
            isClickable ? 'group-hover:bg-brand-primary/20' : '',
          ].join(' ')}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary text-sm leading-tight">{label}</h3>
            {statusInfo && (
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
          )}
        </div>

        {/* Lock overlay for disabled */}
        {isDisabled && (
          <div className="absolute top-3 right-3 text-text-muted">
            <LockIcon size={14} />
          </div>
        )}
      </div>
    );

    if (href && !isDisabled) {
      return (
        <a href={href} className="block no-underline cursor-pointer" tabIndex={0}>
          {inner}
        </a>
      );
    }

    return inner;
  },
);

ModuleCard.displayName = 'ModuleCard';
