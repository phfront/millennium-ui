import React, { forwardRef } from 'react';

export interface RangeProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percent: number;
  startLabel: string;
  endLabel: string;
  currentLabel?: string;
  /** Texto abaixo da barra. Alternativa a `formatFooter`. */
  footerText?: string;
  /** Recebe o percentual já limitado a 0–100. */
  formatFooter?: (clampedPercent: number) => string;
}

export const RangeProgressBar = forwardRef<HTMLDivElement, RangeProgressBarProps>(
  ({ percent, startLabel, endLabel, currentLabel, footerText, formatFooter, className = '', ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, percent));
    const resolvedFooter =
      formatFooter !== undefined ? formatFooter(clamped) : footerText;

    return (
      <div ref={ref} className={['flex flex-col gap-2', className].join(' ')} {...props}>
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>{startLabel}</span>
          {currentLabel && <span className="font-semibold text-brand-primary">{currentLabel}</span>}
          <span>{endLabel}</span>
        </div>
        <div className="relative h-3 bg-surface-3 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-primary transition-all duration-500"
            style={{ width: `${clamped}%` }}
          />
          {clamped > 0 && clamped < 100 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-primary border-2 border-surface-1 shadow transition-all duration-500"
              style={{ left: `calc(${clamped}% - 8px)` }}
            />
          )}
        </div>
        {resolvedFooter !== undefined && resolvedFooter !== '' && (
          <div className="text-right text-xs text-text-muted tabular-nums">{resolvedFooter}</div>
        )}
      </div>
    );
  },
);

RangeProgressBar.displayName = 'RangeProgressBar';
