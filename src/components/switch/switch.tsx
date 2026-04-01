'use client';

import React, { forwardRef, useId } from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, id: externalId, className = '', disabled, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={[
          'inline-flex items-start gap-3 cursor-pointer',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ].join(' ')}
      >
        <div className="relative shrink-0 mt-0.5">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div
            className={[
              'h-5 w-9 rounded-full border border-border bg-surface-3',
              'transition-[background-color,border-color] duration-[var(--transition-fast)]',
              'peer-checked:bg-brand-primary peer-checked:border-brand-primary',
              'peer-focus-visible:shadow-glow-brand',
            ].join(' ')}
          />
          <div
            className={[
              'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm',
              'transition-transform duration-[var(--transition-fast)]',
              'peer-checked:translate-x-4',
            ].join(' ')}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
            {description && <span className="text-xs text-text-muted">{description}</span>}
          </div>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
