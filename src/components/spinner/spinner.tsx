import React, { forwardRef } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: SpinnerSize;
  label?: string;
}

const sizeMap: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 36 };

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = 'md', label = 'Carregando...', className = '', ...props }, ref) => {
    const px = sizeMap[size];
    return (
      <svg
        ref={ref}
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        role="status"
        aria-label={label}
        className={['animate-spin text-brand-primary', className].join(' ')}
        {...props}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="40 60"
          opacity="0.25"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  },
);

Spinner.displayName = 'Spinner';
