'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast, type ToastVariant } from '../../hooks/use-toast';

// ── Single Toast Item ───────────────────────────────────────────────────────

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const variantClasses: Record<ToastVariant, string> = {
  success: 'border-l-success text-success',
  error: 'border-l-danger text-danger',
  warning: 'border-l-warning text-warning',
  info: 'border-l-info text-info',
};

interface ToastItemProps {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  onDismiss: (id: string) => void;
}

function ToastItem({ id, variant, title, description, duration = 4000, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(t);
  }, [id, duration, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        'flex items-start gap-3 min-w-[280px] max-w-[380px] rounded-lg',
        'bg-surface-2 border border-border border-l-4 shadow-md px-4 py-3',
        'animate-slide-up',
        variantClasses[variant],
      ].join(' ')}
    >
      <span className="shrink-0 mt-0.5">{icons[variant]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {description && <p className="text-xs text-text-secondary mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        aria-label="Fechar notificação"
        onClick={() => onDismiss(id)}
        className="shrink-0 text-text-muted hover:text-text-primary transition-colors mt-0.5"
      >
        <X size={16} />
      </button>
    </div>
  );
}

// ── Provider ───────────────────────────────────────────────────────────────

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProviderProps {
  position?: ToastPosition;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

export function ToastProvider({ position = 'bottom-right' }: ToastProviderProps) {
  const { toasts, toast } = useToast();

  return (
    <div
      aria-live="polite"
      aria-label="Notificações"
      className={['fixed z-50 flex flex-col gap-2', positionClasses[position]].join(' ')}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onDismiss={toast.dismiss} />
      ))}
    </div>
  );
}

// Re-export for convenience
export { useToast } from '../../hooks/use-toast';
