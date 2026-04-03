'use client';

import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface CompletionToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labelOn?: string;
  labelOff?: string;
}

export const CompletionToggle = forwardRef<HTMLButtonElement, CompletionToggleProps>(
  (
    {
      checked,
      onCheckedChange,
      labelOn = 'Concluído!',
      labelOff = 'Marcar como feito',
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
        'w-full h-16 rounded-xl flex items-center justify-center gap-3 text-base font-semibold cursor-pointer',
        'transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        checked
          ? 'bg-success/20 text-success border-2 border-success'
          : 'bg-surface-3 text-text-secondary border-2 border-border hover:border-brand-primary hover:text-brand-primary',
        className,
      ].join(' ')}
      {...props}
    >
      <span
        className={[
          'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
          checked ? 'bg-success' : 'bg-surface-2',
        ].join(' ')}
      >
        <Check size={18} className={checked ? 'text-white' : 'text-text-muted'} />
      </span>
      {checked ? labelOn : labelOff}
    </button>
  ),
);

CompletionToggle.displayName = 'CompletionToggle';
