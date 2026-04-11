'use client';

import React, { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onValueChange?: (value: string) => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', onValueChange, onChange, disabled, ...props }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <label className={`group relative inline-flex items-center justify-center cursor-pointer align-middle ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
        <input
          type="radio"
          ref={ref}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 rounded-full border border-border bg-surface-1 flex items-center justify-center transition-all duration-200 ease-in-out peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0 group-has-[:checked]:border-brand-primary">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary scale-0 opacity-0 transition-all duration-200 group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100" />
        </div>
      </label>
    );
  }
);

Radio.displayName = 'Radio';
