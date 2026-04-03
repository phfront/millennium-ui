import React, { forwardRef } from 'react';

export interface StreakBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  suffix?: string;
  icon?: React.ReactNode;
  hideWhenZero?: boolean;
}

export const StreakBadge = forwardRef<HTMLDivElement, StreakBadgeProps>(
  (
    {
      count,
      suffix = 'dias',
      icon = <span className="text-base">🔥</span>,
      hideWhenZero = true,
      className = '',
      ...props
    },
    ref,
  ) => {
    if (hideWhenZero && count === 0) return null;

    return (
      <div
        ref={ref}
        className={[
          'flex items-center gap-1.5 bg-orange-500/10 px-3 py-1.5 rounded-full',
          className,
        ].join(' ')}
        {...props}
      >
        {icon}
        <span className="text-sm font-bold text-orange-400 tabular-nums">{count}</span>
        {suffix ? <span className="text-xs text-orange-400/70">{suffix}</span> : null}
      </div>
    );
  },
);

StreakBadge.displayName = 'StreakBadge';
