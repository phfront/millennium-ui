'use client';

import React, { forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../button/button';

export type CalendarHeatmapDay = {
  date: string;
  percent: number;
  pointsEarned?: number;
  pointsMax?: number;
  pointsPercent?: number;
};

const DEFAULT_WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const DEFAULT_MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const LEGEND_STOPS = [0, 25, 50, 75, 100];

function getHeatmapColor(percent: number): React.CSSProperties {
  if (percent <= 0) return {};
  const hue = Math.round((percent / 100) * 120);
  return { backgroundColor: `hsl(${hue}, 65%, 38%)` };
}

export interface CalendarHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: CalendarHeatmapDay[];
  month: Date;
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  /** Se true, desativa o botão “próximo mês” (ex.: não ultrapassar o mês corrente). */
  isCurrentMonth?: boolean;
  weekDayLabels?: string[];
  monthNames?: string[];
  legendMinLabel?: string;
  legendMaxLabel?: string;
  ariaPrevMonth?: string;
  ariaNextMonth?: string;
}

export const CalendarHeatmap = forwardRef<HTMLDivElement, CalendarHeatmapProps>(
  (
    {
      data,
      month,
      selectedDate,
      onSelectDate,
      onPrevMonth,
      onNextMonth,
      isCurrentMonth,
      weekDayLabels = DEFAULT_WEEK_DAYS,
      monthNames = DEFAULT_MONTH_NAMES,
      legendMinLabel = '0%',
      legendMaxLabel = '100%',
      ariaPrevMonth = 'Mês anterior',
      ariaNextMonth = 'Próximo mês',
      className = '',
      ...props
    },
    ref,
  ) => {
    const year = month.getFullYear();
    const monthNum = month.getMonth();
    const firstDay = new Date(year, monthNum, 1).getDay();
    const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
    const _now = new Date();
    const today = `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2, '0')}-${String(_now.getDate()).padStart(2, '0')}`;

    const dataMap = new Map(data.map((d) => [d.date, d]));

    const cells: (number | null)[] = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
      <div ref={ref} className={['flex flex-col gap-3', className].join(' ')} {...props}>
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-4 shrink-0">
            <Button type="button" variant="outline" size="icon" onClick={onPrevMonth} aria-label={ariaPrevMonth}>
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </Button>
            <span className="px-2 text-sm font-semibold text-text-primary whitespace-nowrap tabular-nums">
              {monthNames[monthNum]} {year}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onNextMonth}
              disabled={isCurrentMonth}
              aria-label={ariaNextMonth}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </Button>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted shrink-0">
            <span>{legendMinLabel}</span>
            {LEGEND_STOPS.map((p) => (
              <div
                key={p}
                className="w-3 h-3 rounded-sm bg-surface-3"
                style={p > 0 ? getHeatmapColor(p) : {}}
              />
            ))}
            <span>{legendMaxLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDayLabels.map((d) => (
            <div key={d} className="text-center text-xs text-text-muted font-medium py-1">
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const dateStr = `${year}-${String(monthNum + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const cell = dataMap.get(dateStr);
            const percent = cell?.percent ?? 0;
            const pointsPercent = cell?.pointsPercent ?? 0;
            const colorValue = cell?.pointsMax ? pointsPercent : percent;
            const isFuture = dateStr > today;
            const isSelected = dateStr === selectedDate;
            const hasPoints = cell && (cell.pointsMax ?? 0) > 0;

            return (
              <button
                key={dateStr}
                type="button"
                disabled={isFuture}
                onClick={() => !isFuture && onSelectDate?.(dateStr)}
                title={`${dateStr}: Metas ${Math.round(percent)}%${
                  hasPoints && cell
                    ? ` · Pontos ${cell.pointsEarned}/${cell.pointsMax} (${cell.pointsPercent}%)`
                    : ''
                }`}
                style={!isFuture && colorValue > 0 ? getHeatmapColor(colorValue) : {}}
                className={[
                  'aspect-square rounded-md transition-all flex flex-col items-center justify-center gap-0',
                  isFuture
                    ? 'opacity-20 cursor-not-allowed bg-surface-3'
                    : `${colorValue <= 0 ? 'bg-surface-3' : ''} cursor-pointer hover:ring-2 hover:ring-white/50`,
                  isSelected ? 'ring-2 ring-white scale-105' : '',
                  dateStr === today ? 'ring-1 ring-white/70' : '',
                ].join(' ')}
              >
                <span className="text-xs font-semibold leading-none">{day}</span>
                {!isFuture && hasPoints && cell && (
                  <>
                    <span className="text-[9px] leading-none opacity-90 mt-0.5">
                      {cell.pointsEarned}/{cell.pointsMax}
                    </span>
                    <span className="text-[8px] leading-none opacity-75">{cell.pointsPercent}%</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

CalendarHeatmap.displayName = 'CalendarHeatmap';
