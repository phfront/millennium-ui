'use client';

import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface CompletionToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labelOn?: string;
  labelOff?: string;
  /** Altura e ícone menores (ex.: cartões estreitos / widget). */
  compact?: boolean;
}

export const CompletionToggle = forwardRef<HTMLButtonElement, CompletionToggleProps>(
  (
    {
      checked,
      onCheckedChange,
      labelOn = 'Concluído!',
      labelOff = 'Marcar como feito',
      compact = false,
      disabled = false,
      className = '',
      type = 'button',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={[
        'flex w-full cursor-pointer items-center justify-center font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        compact
          ? 'mb-0.5 h-9 min-h-0 gap-1.5 rounded-lg px-2 py-1 text-xs leading-tight'
          : 'h-16 gap-3 rounded-xl text-base',
        'border-2',
        checked
          ? 'border-success bg-success/20 text-success'
          : 'border-border bg-surface-3 text-text-secondary hover:border-brand-primary hover:text-brand-primary',
        className,
      ].join(' ')}
      {...props}
    >
      <span
        className={[
          'flex shrink-0 items-center justify-center rounded-full transition-colors',
          compact ? 'h-5 w-5' : 'h-8 w-8',
          checked ? 'bg-success' : 'bg-surface-2',
        ].join(' ')}
      >
        <Check size={compact ? 12 : 18} className={checked ? 'text-white' : 'text-text-muted'} />
      </span>
      {checked ? labelOn : labelOff}
    </button>
  ),
);

CompletionToggle.displayName = 'CompletionToggle';
