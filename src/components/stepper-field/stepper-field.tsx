'use client';

import React, { forwardRef, useId } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface StepperFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  step?: number;
  min?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  /** Sufixo à direita dentro do campo (ex. "kg") */
  suffix?: string;
  decrementAriaLabel: string;
  incrementAriaLabel: string;
}

export const StepperField = forwardRef<HTMLDivElement, StepperFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder = '0.0',
      disabled,
      step = 0.1,
      min = 0,
      inputMode = 'decimal',
      suffix,
      decrementAriaLabel,
      incrementAriaLabel,
      className = '',
      ...props
    },
    ref,
  ) => {
    const id = useId();

    function adjust(delta: number) {
      const current = parseFloat(value) || 0;
      const inv = 1 / step;
      const next = Math.max(min, Math.round((current + delta) * inv) / inv);
      const decimals = step.toString().split('.')[1]?.length ?? 0;
      onChange(next.toFixed(decimals));
    }

    return (
      <div ref={ref} className={['flex flex-col gap-1.5', className].join(' ')} {...props}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => adjust(-step)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-3 text-text-primary hover:bg-surface-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={decrementAriaLabel}
          >
            <Minus size={16} strokeWidth={2.5} />
          </button>
          <div className="relative flex-1">
            <input
              id={id}
              type="number"
              step={step}
              min={min}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder={placeholder}
              inputMode={inputMode}
              className="w-full h-10 rounded-lg border border-border bg-surface-3 px-3 text-center text-lg font-bold tabular-nums text-text-primary focus:outline-none focus:border-brand-primary disabled:opacity-40 disabled:cursor-not-allowed"
              style={suffix ? { paddingRight: '2.25rem' } : undefined}
            />
            {suffix && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium pointer-events-none">
                {suffix}
              </span>
            )}
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={() => adjust(step)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-3 text-text-primary hover:bg-surface-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={incrementAriaLabel}
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  },
);

StepperField.displayName = 'StepperField';
