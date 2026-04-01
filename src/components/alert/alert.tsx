'use client';

import React, { forwardRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type AlertVariant = 'success' | 'danger' | 'warning' | 'info';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}

const config: Record<AlertVariant, { icon: React.ReactNode; containerClass: string; iconClass: string }> = {
  success: {
    icon: <CheckCircle2 size={16} />,
    containerClass: 'bg-success-bg border-success-border text-success',
    iconClass: 'text-success',
  },
  danger: {
    icon: <XCircle size={16} />,
    containerClass: 'bg-danger-bg border-danger-border text-danger',
    iconClass: 'text-danger',
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    containerClass: 'bg-warning-bg border-warning-border text-warning',
    iconClass: 'text-warning',
  },
  info: {
    icon: <Info size={16} />,
    containerClass: 'bg-info-bg border-info-border text-info',
    iconClass: 'text-info',
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, children, onClose, className = '', ...props }, ref) => {
    const { icon, containerClass } = config[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={[
          'flex gap-3 items-start rounded-md border px-4 py-3 text-sm',
          containerClass,
          className,
        ].join(' ')}
        {...props}
      >
        <span className="shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold mb-0.5">{title}</p>}
          {children && <div className="opacity-90">{children}</div>}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar alerta"
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
