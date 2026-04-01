'use client';

import React, { forwardRef, useId } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, helperText, errorMessage, autoResize = false, id: externalId, className = '', ...props },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hasError = Boolean(errorMessage);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const el = e.currentTarget;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
      props.onInput?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          onInput={handleInput}
          className={[
            'w-full min-h-[80px] rounded-md border bg-surface-3 text-text-primary text-sm px-3 py-2',
            'placeholder:text-text-muted resize-y',
            'transition-[border-color,box-shadow] duration-[var(--transition-fast)]',
            'focus:outline-none focus:border-brand-primary focus:shadow-glow-brand',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            hasError ? 'border-danger' : 'border-border',
            autoResize ? 'resize-none overflow-hidden' : '',
            className,
          ].join(' ')}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
