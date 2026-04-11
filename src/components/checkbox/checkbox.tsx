'use client';

import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', onCheckedChange, onChange, disabled, ...props }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <label className={`group relative inline-flex items-center justify-center cursor-pointer align-middle ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
        <input
          type="checkbox"
          ref={ref}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 rounded-[4px] border border-border bg-surface-1 flex items-center justify-center transition-all duration-200 ease-in-out peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0 group-has-[:checked]:bg-brand-primary group-has-[:checked]:border-brand-primary">
          <Check strokeWidth={3} className="w-3.5 h-3.5 text-[var(--color-brand-primary-text,white)] scale-50 opacity-0 transition-all duration-200 group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100" />
        </div>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
