import React, { forwardRef } from 'react';
import { Skeleton } from '../skeleton/skeleton';

export type StatCardValueTone = 'default' | 'positive' | 'negative' | 'muted';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  sub?: string;
  valueTone?: StatCardValueTone;
  /** Ícone opcional alinhado ao rótulo (ex. Lucide). */
  icon?: React.ReactNode;
  /** Mostra skeleton no lugar do valor. */
  isLoading?: boolean;
  /** `md` para cartões compactos em grelha; `lg` (default) mantém o tamanho original. */
  valueSize?: 'md' | 'lg';
}

const toneClass: Record<StatCardValueTone, string> = {
  default: 'text-text-primary',
  positive: 'text-success',
  negative: 'text-danger',
  muted: 'text-text-muted',
};

const valueSizeClass: Record<NonNullable<StatCardProps['valueSize']>, string> = {
  md: 'text-xl font-bold tabular-nums leading-tight',
  lg: 'text-2xl font-bold tabular-nums',
};

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      sub,
      valueTone = 'default',
      icon,
      isLoading,
      valueSize = 'lg',
      className = '',
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={['flex flex-col gap-1 p-4 bg-surface-2 rounded-xl border border-border', className].join(' ')}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted font-medium uppercase tracking-wide">{label}</span>
        {icon != null && <span className="text-text-muted shrink-0">{icon}</span>}
      </div>
      {isLoading ? (
        <Skeleton className={valueSize === 'md' ? 'h-7 w-28 mt-1' : 'h-8 w-32 mt-1'} />
      ) : (
        <span className={[valueSizeClass[valueSize], toneClass[valueTone]].join(' ')}>{value}</span>
      )}
      {sub && <span className="text-xs text-text-muted">{sub}</span>}
    </div>
  ),
);

StatCard.displayName = 'StatCard';
