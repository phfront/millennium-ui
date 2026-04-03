import React, { forwardRef } from 'react';

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ value, max, size = 56, strokeWidth = 5, className = '', ...props }, ref) => {
    const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div
        ref={ref}
        className={['relative inline-flex items-center justify-center', className].join(' ')}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-surface-3"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="stroke-brand-primary transition-all duration-300"
          />
        </svg>
        <span className="absolute text-xs font-bold text-text-primary">{Math.round(percent)}%</span>
      </div>
    );
  },
);

CircularProgress.displayName = 'CircularProgress';
