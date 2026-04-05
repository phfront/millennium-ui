'use client';

import React, { forwardRef } from 'react';
import { Spinner } from '../spinner/spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-brand-primary text-[var(--color-brand-primary-text,white)]',
    'hover:bg-[var(--color-brand-primary-hover)]',
    'focus-visible:shadow-glow-brand',
    'disabled:opacity-50',
  ].join(' '),
  secondary: [
    'bg-brand-secondary text-[var(--color-brand-secondary-text,white)]',
    'hover:bg-[var(--color-brand-secondary-hover)]',
    'focus-visible:shadow-glow-brand',
    'disabled:opacity-50',
  ].join(' '),
  outline: [
    'bg-transparent text-text-primary border border-border',
    'hover:bg-surface-3 hover:border-border-strong',
    'focus-visible:shadow-glow-brand',
    'disabled:opacity-50',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-secondary',
    'hover:bg-surface-3 hover:text-text-primary',
    'focus-visible:shadow-glow-brand',
    'disabled:opacity-50',
  ].join(' '),
  danger: [
    'bg-danger text-white',
    'hover:opacity-90',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger',
    'disabled:opacity-50',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
  icon: 'w-10 h-10 p-2 text-base justify-center',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={[
          'inline-flex items-center justify-center font-medium rounded-md',
          'transition-all duration-[var(--transition-fast)]',
          'focus-visible:outline-none',
          'cursor-pointer disabled:cursor-not-allowed select-none',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === 'lg' ? 'md' : 'sm'} className="text-current" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
