import React, { forwardRef } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  label?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', label, className = '', ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={['w-px self-stretch bg-border', className].join(' ')}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={['flex items-center gap-3 text-text-muted text-xs', className].join(' ')}
          {...props}
        >
          <span className="flex-1 h-px bg-border" />
          <span>{label}</span>
          <span className="flex-1 h-px bg-border" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={['h-px w-full bg-border', className].join(' ')}
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';
