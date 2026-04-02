'use client';

import React, { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel' | 'date';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: InputType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      type = 'text',
      id: externalId,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);
    const hasError = Boolean(errorMessage);
    const isPassword = type === 'password';
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-text-muted pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            type={resolvedType}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={[
              'w-full h-10 rounded-md border bg-surface-3 text-text-primary text-sm',
              'placeholder:text-text-muted',
              'transition-[border-color,box-shadow] duration-[var(--transition-fast)]',
              'focus:outline-none focus:border-brand-primary focus:shadow-glow-brand',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              hasError ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border',
              leftIcon ? 'pl-10' : 'pl-3',
              rightIcon || isPassword ? 'pr-10' : 'pr-3',
              className,
            ].join(' ')}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              className="absolute right-3 text-text-muted hover:text-text-secondary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          ) : (
            rightIcon && (
              <span className="absolute right-3 text-text-muted pointer-events-none flex items-center">
                {rightIcon}
              </span>
            )
          )}
        </div>
        {hasError ? (
          <p id={`${id}-error`} role="alert" className="text-xs text-danger">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="text-xs text-text-muted">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
