'use client';

import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export type LineChartSeriesConfig = {
  dataKey: string;
  name: string;
  color?: string;
  strokeWidth?: number;
  type?: 'monotone' | 'linear';
  dot?: boolean | Record<string, unknown>;
  connectNulls?: boolean;
  strokeDasharray?: string;
};

export type LineChartPeriodOption = { id: string; label: string };

export type LineChartReferenceLineConfig = {
  y: number;
  stroke?: string;
  strokeDasharray?: string;
  strokeWidth?: number;
};

export interface LineChartPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Linhas já no formato Recharts (objetos com chaves por série + eixo X) */
  data: Record<string, string | number | null>[];
  xDataKey: string;
  series: LineChartSeriesConfig[];
  referenceLines?: LineChartReferenceLineConfig[];
  height?: number;
  emptyContent?: React.ReactNode;
  periods?: LineChartPeriodOption[];
  /** Controlado: id do período selecionado (com `periods` + `onPeriodChange`) */
  selectedPeriodId?: string;
  onPeriodChange?: (periodId: string) => void;
  /** Margem do ResponsiveContainer / LineChart */
  chartMargin?: { top?: number; right?: number; left?: number; bottom?: number };
  showLegend?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DefaultTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-3 text-xs shadow-lg">
      <p className="font-semibold text-text-primary mb-1">{label}</p>
      {payload.map((p: { name: string; value: number | string | null; color: string }) => {
        const v = p.value;
        const display =
          typeof v === 'number' && Number.isFinite(v) ? v.toFixed(1) : v ?? '—';
        return (
          <p key={String(p.name)} style={{ color: p.color }}>
            {p.name}: <span className="font-bold">{display}</span>
          </p>
        );
      })}
    </div>
  );
}

export function LineChartPanel({
  data,
  xDataKey,
  series,
  referenceLines,
  height = 240,
  emptyContent,
  periods,
  selectedPeriodId: controlledPeriod,
  onPeriodChange,
  chartMargin = { top: 4, right: 4, left: -20, bottom: 0 },
  showLegend = true,
  className = '',
  ...props
}: LineChartPanelProps) {
  const [uncontrolledPeriod, setUncontrolledPeriod] = useState<string | undefined>(
    periods?.[0]?.id,
  );

  const selectedPeriodId = controlledPeriod ?? uncontrolledPeriod;

  function handlePeriod(id: string) {
    if (onPeriodChange) onPeriodChange(id);
    else setUncontrolledPeriod(id);
  }

  const margin = useMemo(
    () => ({
      top: chartMargin.top ?? 4,
      right: chartMargin.right ?? 4,
      left: chartMargin.left ?? -20,
      bottom: chartMargin.bottom ?? 0,
    }),
    [chartMargin.top, chartMargin.right, chartMargin.left, chartMargin.bottom],
  );

  if (data.length === 0) {
    return (
      <div className={className} {...props}>
        {emptyContent ?? (
          <div className="flex items-center justify-center h-48 text-sm text-text-muted">Sem dados.</div>
        )}
      </div>
    );
  }

  return (
    <div className={['flex flex-col gap-3', className].join(' ')} {...props}>
      {periods && periods.length > 0 && (
        <div className="flex items-center gap-1">
          {periods.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => handlePeriod(btn.id)}
              className={[
                'px-3 py-1 rounded-lg text-xs font-semibold transition-colors',
                selectedPeriodId === btn.id
                  ? 'bg-brand-primary text-white'
                  : 'bg-surface-3 text-text-muted hover:text-text-primary',
              ].join(' ')}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey={xDataKey}
            tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<DefaultTooltip />} />
          {showLegend && (
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          )}
          {referenceLines?.map((rl, i) => (
            <ReferenceLine
              key={`${rl.y}-${i}`}
              y={rl.y}
              stroke={rl.stroke ?? 'var(--color-success)'}
              strokeDasharray={rl.strokeDasharray ?? '4 4'}
              strokeWidth={rl.strokeWidth ?? 1}
            />
          ))}
          {series.map((s) => (
            <Line
              key={s.dataKey}
              type={s.type ?? 'monotone'}
              dataKey={s.dataKey}
              name={s.name}
              stroke={s.color ?? 'var(--color-brand-primary)'}
              strokeWidth={s.strokeWidth ?? 2}
              dot={s.dot ?? { r: 3 }}
              connectNulls={s.connectNulls}
              strokeDasharray={s.strokeDasharray}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

LineChartPanel.displayName = 'LineChartPanel';
