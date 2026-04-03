import React, { forwardRef } from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

export interface DeltaBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  delta: number | null;
  /** Unidade exibida após o valor absoluto (ex. "kg") */
  unit?: string;
  /** Texto extra após o valor (ex. "vs. anterior") */
  suffix?: string;
  emptyLabel?: string;
  /** Quando true, delta negativo é tratado como "bom" (verde), positivo como "ruim" (vermelho). Ex.: perda de peso. */
  invertSemantics?: boolean;
  decimals?: number;
}

export const DeltaBadge = forwardRef<HTMLSpanElement, DeltaBadgeProps>(
  (
    {
      delta,
      unit = '',
      suffix,
      emptyLabel = 'Sem dados',
      invertSemantics = false,
      decimals = 1,
      className = '',
      ...props
    },
    ref,
  ) => {
    if (delta === null) {
      return (
        <span
          ref={ref}
          className={[
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-3 text-text-muted text-xs font-medium',
            className,
          ].join(' ')}
          {...props}
        >
          <Minus size={12} />
          {emptyLabel}
        </span>
      );
    }

    const neutral = delta === 0;
    const negative = delta < 0;

    let bg: string;
    if (neutral) {
      bg = 'bg-surface-3 text-text-muted';
    } else if (invertSemantics) {
      bg = negative ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger';
    } else {
      bg = negative ? 'bg-danger/15 text-danger' : 'bg-success/15 text-success';
    }

    const Icon = neutral ? Minus : negative ? TrendingDown : TrendingUp;

    const sign = neutral ? '' : negative ? '−' : delta > 0 ? '+' : '';
    const abs = Math.abs(delta).toFixed(decimals);
    const unitPart = unit ? ` ${unit}` : '';
    const suffixPart = suffix ? ` ${suffix}` : '';
    const text = `${sign}${abs}${unitPart}${suffixPart}`;

    return (
      <span
        ref={ref}
        className={['inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold', bg, className].join(
          ' ',
        )}
        {...props}
      >
        <Icon size={13} strokeWidth={2.5} />
        {text}
      </span>
    );
  },
);

DeltaBadge.displayName = 'DeltaBadge';
