'use client';

import React, { useState, useRef, useEffect, useId, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, X, ChevronDown } from 'lucide-react';
import type { MonthYearValue } from '../month-picker/month-picker';

// ─── Exported Types ───────────────────────────────────────────────────────────

export interface DateRange {
  start: Date | undefined;
  end: Date | undefined;
}

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  min?: Date;
  max?: Date;
  /** Fixa o calendário neste mês/ano (sem setas). Combina com `min`/`max` (interseção por dia). */
  lockToMonthYear?: MonthYearValue;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export interface TimePickerProps {
  /** Valor no formato "HH:MM" */
  value?: string;
  onChange?: (time: string | undefined) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  /** Intervalo entre minutos disponíveis. Padrão: 1 */
  minuteStep?: number;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  min?: Date;
  max?: Date;
  /** Fixa o calendário neste mês/ano (sem setas). Combina com `min`/`max` (interseção por dia). */
  lockToMonthYear?: MonthYearValue;
  minuteStep?: number;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  min?: Date;
  max?: Date;
  /** Fixa o intervalo neste mês/ano: um único calendário, sem navegação. Combina com `min`/`max`. */
  lockToMonthYear?: MonthYearValue;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export interface TimeRange {
  start: string | undefined;
  end: string | undefined;
}

export interface TimeRangePickerProps {
  value?: TimeRange;
  onChange?: (range: TimeRange) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  /** Intervalo entre minutos disponíveis. Padrão: 1 */
  minuteStep?: number;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export interface DateTimeRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  min?: Date;
  max?: Date;
  /** Fixa o intervalo neste mês/ano: um único calendário, sem navegação. Combina com `min`/`max`. */
  lockToMonthYear?: MonthYearValue;
  minuteStep?: number;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
] as const;

const DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

// ─── Utilities ────────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeDay(a: Date, b: Date): boolean {
  return (
    new Date(a.getFullYear(), a.getMonth(), a.getDate()) <
    new Date(b.getFullYear(), b.getMonth(), b.getDate())
  );
}

function isBetweenDays(date: Date, start: Date, end: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return d > s && d < e;
}

function formatDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${d}/${m}/${date.getFullYear()}`;
}

function formatTimeStr(h: number, m: number): string {
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTimeStr(date.getHours(), date.getMinutes())}`;
}

function parseTimeStr(time: string): { hours: number; minutes: number } | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const h = parseInt(match[1]!, 10);
  const m = parseInt(match[2]!, 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return { hours: h, minutes: m };
}

function isDateDisabled(date: Date, min?: Date, max?: Date): boolean {
  if (min && isBeforeDay(date, min)) return true;
  if (max && isBeforeDay(max, date)) return true;
  return false;
}

/** Intersecção entre o mês fechado e min/max (por dia civil). */
function mergeMinMaxWithMonthLock(
  lock: MonthYearValue,
  min?: Date,
  max?: Date,
): { min?: Date; max?: Date } {
  const lockStart = new Date(lock.year, lock.month, 1);
  const lockEnd = new Date(lock.year, lock.month + 1, 0);
  let effMin = lockStart;
  let effMax = lockEnd;
  if (min) {
    const d = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (d > effMin) effMin = d;
  }
  if (max) {
    const d = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (d < effMax) effMax = d;
  }
  if (effMin > effMax) {
    return { min: lockEnd, max: lockStart };
  }
  return { min: effMin, max: effMax };
}

// ─── Internal Hooks ───────────────────────────────────────────────────────────

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (containerRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    }
    document.addEventListener('keydown', handleEscape, true);
    return () => document.removeEventListener('keydown', handleEscape, true);
  }, [isOpen]);

  return { isOpen, setIsOpen, containerRef, panelRef };
}

function useMonthNavigation(initial?: Date, lock?: MonthYearValue) {
  const locked = lock !== undefined;
  const init = () => {
    if (locked) return { y: lock.year, m: lock.month };
    const base = initial ?? new Date();
    return { y: base.getFullYear(), m: base.getMonth() };
  };
  const i = init();
  const [year, setYear] = useState(i.y);
  const [month, setMonth] = useState(i.m);

  useEffect(() => {
    if (locked) {
      setYear(lock.year);
      setMonth(lock.month);
    }
  }, [locked, lock?.year, lock?.month]);

  const prevMonth = useCallback(() => {
    if (locked) return;
    setYear((y) => (month === 0 ? y - 1 : y));
    setMonth((m) => (m === 0 ? 11 : m - 1));
  }, [month, locked]);

  const nextMonth = useCallback(() => {
    if (locked) return;
    setYear((y) => (month === 11 ? y + 1 : y));
    setMonth((m) => (m === 11 ? 0 : m + 1));
  }, [month, locked]);

  return { year, month, prevMonth, nextMonth };
}

// ─── FieldWrapper (internal) ──────────────────────────────────────────────────

interface FieldWrapperProps {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  displayValue: React.ReactNode;
  leftIcon: React.ReactNode;
  onClear?: () => void;
  className?: string;
}

function FieldWrapper({
  id,
  label,
  error,
  helperText,
  disabled,
  isOpen,
  onToggle,
  displayValue,
  leftIcon,
  onClear,
  className = '',
}: FieldWrapperProps) {
  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && onToggle()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onToggle();
          }
          if (e.key === 'Escape') {
            e.preventDefault();
            // handled at component level via useDropdown
          }
        }}
        className={[
          'flex min-h-[40px] w-full items-center gap-2 rounded-md border px-3 py-2',
          'text-sm transition-[border-color,box-shadow] duration-[var(--transition-fast)]',
          'bg-surface-3 select-none',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-brand-primary',
          error ? 'border-danger' : 'border-border',
          isOpen && !error ? 'border-brand-primary shadow-glow-brand' : '',
        ].join(' ')}
      >
        <span className="text-text-muted flex-shrink-0 flex items-center">{leftIcon}</span>
        <div className="flex-1 overflow-hidden min-w-0">{displayValue}</div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
          {onClear && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              aria-label="Limpar"
              className="text-text-muted hover:text-text-primary transition-colors rounded p-0.5 focus:outline-none"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={[
              'text-text-secondary transition-transform duration-[var(--transition-fast)]',
              isOpen ? 'rotate-180' : '',
            ].join(' ')}
          />
        </div>
      </div>
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}

// ─── Dropdown (portal, fixed) ─────────────────────────────────────────────────

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  panelRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

function Dropdown({ children, className = '', anchorRef, panelRef, isOpen }: DropdownProps) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current) return;

    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const a = el.getBoundingClientRect();
      const gap = 4;
      const ph = panelRef.current?.offsetHeight ?? 320;
      const pw = panelRef.current?.offsetWidth ?? Math.max(a.width, 280);
      let top = a.bottom + gap;
      if (top + ph > window.innerHeight - 8 && a.top - ph - gap >= 8) {
        top = a.top - ph - gap;
      } else if (top + ph > window.innerHeight - 8) {
        top = Math.max(8, window.innerHeight - ph - 8);
      }
      let left = a.left;
      if (left + pw > window.innerWidth - 8) {
        left = Math.max(8, window.innerWidth - pw - 8);
      }
      left = Math.max(8, left);
      setPos({ top, left });
    };

    update();
    const id = requestAnimationFrame(() => update());
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);

    const panel = panelRef.current;
    let resizeObserver: ResizeObserver | undefined;
    if (panel && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => update());
      resizeObserver.observe(panel);
    }

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
      resizeObserver?.disconnect();
    };
  }, [isOpen, anchorRef, panelRef]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={panelRef as React.Ref<HTMLDivElement>}
      className={[
        'fixed z-[100] bg-surface-2 border border-border rounded-lg',
        'shadow-[var(--shadow-md)] animate-fade-in origin-top overflow-hidden',
        className,
      ].join(' ')}
      style={{ top: pos.top, left: pos.left }}
    >
      {children}
    </div>,
    document.body,
  );
}

// ─── CalendarGrid (internal) ──────────────────────────────────────────────────

interface CalendarGridProps {
  year: number;
  month: number;
  selected?: Date;
  rangeStart?: Date;
  rangeEnd?: Date;
  hoverDate?: Date;
  min?: Date;
  max?: Date;
  onSelect: (date: Date) => void;
  onHoverDate?: (date: Date | undefined) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  /** Sem setas de mês (ex.: `lockToMonthYear`). */
  navigationLocked?: boolean;
}

function CalendarGrid({
  year,
  month,
  selected,
  rangeStart,
  rangeEnd,
  hoverDate,
  min,
  max,
  onSelect,
  onHoverDate,
  onPrevMonth,
  onNextMonth,
  navigationLocked = false,
}: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells: (Date | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const effectiveEnd = rangeEnd ?? hoverDate;
  const today = new Date();

  return (
    <div className="p-3 w-[280px] flex-shrink-0 select-none">
      {/* Month / Year header */}
      <div
        className={[
          'flex items-center mb-3',
          navigationLocked ? 'justify-center' : 'justify-between',
        ].join(' ')}
      >
        {!navigationLocked ? (
          <>
            <button
              type="button"
              onClick={onPrevMonth}
              aria-label="Mês anterior"
              className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-3 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-text-primary">
              {MONTHS_PT[month]} {year}
            </span>
            <button
              type="button"
              onClick={onNextMonth}
              aria-label="Próximo mês"
              className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-3 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </>
        ) : (
          <span className="text-sm font-semibold text-text-primary" aria-live="polite">
            {MONTHS_PT[month]} {year}
          </span>
        )}
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_PT.map((d) => (
          <div key={d} className="text-center text-xs text-text-muted py-1 font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          if (!date) return <div key={`e${idx}`} className="h-8" />;

          const isSelected = Boolean(selected && isSameDay(date, selected));
          const isStart = Boolean(rangeStart && isSameDay(date, rangeStart));
          const isEnd = Boolean(rangeEnd && isSameDay(date, rangeEnd));
          const isHoverEnd = Boolean(!rangeEnd && hoverDate && isSameDay(date, hoverDate));
          const isInRange = Boolean(
            rangeStart &&
              effectiveEnd &&
              !isBeforeDay(effectiveEnd, rangeStart) &&
              isBetweenDays(date, rangeStart, effectiveEnd),
          );
          const isToday = isSameDay(date, today);
          const isDisabled = isDateDisabled(date, min, max);
          const isHighlighted = isSelected || isStart || isEnd || isHoverEnd;

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(date)}
              onMouseEnter={() => onHoverDate?.(date)}
              onMouseLeave={() => onHoverDate?.(undefined)}
              aria-label={formatDate(date)}
              aria-pressed={isHighlighted}
              aria-disabled={isDisabled}
              className={[
                'h-8 w-full flex items-center justify-center text-xs transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary',
                isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
                isHighlighted
                  ? 'bg-brand-primary text-white font-semibold rounded-md'
                  : isInRange
                    ? 'bg-brand-primary/15 text-brand-primary rounded-none'
                    : isToday
                      ? 'border border-brand-primary text-brand-primary rounded-md'
                      : !isDisabled
                        ? 'text-text-primary hover:bg-surface-3 hover:text-brand-primary rounded-md'
                        : 'text-text-muted rounded-md',
              ].join(' ')}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── TimeColumns (internal) ───────────────────────────────────────────────────

interface TimeColumnsProps {
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
  minuteStep?: number;
}

function TimeColumns({ hours, minutes, onChange, minuteStep = 1 }: TimeColumnsProps) {
  const hourItems = Array.from({ length: 24 }, (_, i) => i);
  const minuteItems = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep,
  ).filter((m) => m < 60);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hourRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: 'center' });
  }, [hours]);

  useEffect(() => {
    minuteRef.current
      ?.querySelector('[data-selected="true"]')
      ?.scrollIntoView({ block: 'center' });
  }, [minutes]);

  const itemCls = (active: boolean) =>
    [
      'w-full px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors text-center',
      active
        ? 'bg-brand-primary text-white font-semibold'
        : 'text-text-primary hover:bg-surface-3 hover:text-brand-primary',
    ].join(' ');

  return (
    <div className="flex border-t border-border">
      <div className="flex-1 flex flex-col p-2 gap-1">
        <span className="text-xs text-text-muted text-center font-medium pb-1">Hora</span>
        <div ref={hourRef} className="overflow-y-auto h-36 flex flex-col gap-0.5">
          {hourItems.map((h) => (
            <button
              key={h}
              type="button"
              data-selected={String(h === hours)}
              onClick={() => onChange(h, minutes)}
              className={itemCls(h === hours)}
            >
              {h.toString().padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
      <div className="w-px bg-border self-stretch" />
      <div className="flex-1 flex flex-col p-2 gap-1">
        <span className="text-xs text-text-muted text-center font-medium pb-1">Min</span>
        <div ref={minuteRef} className="overflow-y-auto h-36 flex flex-col gap-0.5">
          {minuteItems.map((m) => (
            <button
              key={m}
              type="button"
              data-selected={String(m === minutes)}
              onClick={() => onChange(hours, m)}
              className={itemCls(m === minutes)}
            >
              {m.toString().padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ConfirmButton (internal) ─────────────────────────────────────────────────

function ConfirmButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="p-2 border-t border-border flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className="px-3 py-1.5 text-xs font-semibold bg-brand-primary text-white rounded-md hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-1"
      >
        Confirmar
      </button>
    </div>
  );
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

export function DatePicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'DD/MM/AAAA',
  min,
  max,
  lockToMonthYear,
  disabled = false,
  clearable = true,
  className = '',
}: DatePickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();
  const { year, month, prevMonth, nextMonth } = useMonthNavigation(value, lockToMonthYear);
  const merged =
    lockToMonthYear !== undefined
      ? mergeMinMaxWithMonthLock(lockToMonthYear, min, max)
      : { min, max };

  const displayValue = value ? (
    <span className="text-text-primary">{formatDate(value)}</span>
  ) : (
    <span className="text-text-muted">{placeholder}</span>
  );

  return (
    <div ref={containerRef} className={['relative', className].join(' ')}>
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={() => setIsOpen((o) => !o)}
        displayValue={displayValue}
        leftIcon={<Calendar size={16} />}
        onClear={clearable && value ? () => onChange?.(undefined) : undefined}
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen}>
          <CalendarGrid
            year={year}
            month={month}
            selected={value}
            min={merged.min}
            max={merged.max}
            onSelect={(date) => {
              onChange?.(date);
              setIsOpen(false);
            }}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            navigationLocked={lockToMonthYear !== undefined}
          />
        </Dropdown>
      )}
    </div>
  );
}

// ─── TimePicker ───────────────────────────────────────────────────────────────

export function TimePicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'HH:MM',
  minuteStep = 1,
  disabled = false,
  clearable = true,
  className = '',
}: TimePickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();

  const parsed = value ? parseTimeStr(value) : null;
  const hours = parsed?.hours ?? 0;
  const minutes = parsed?.minutes ?? 0;

  const displayValue = value ? (
    <span className="text-text-primary font-mono">{value}</span>
  ) : (
    <span className="text-text-muted">{placeholder}</span>
  );

  const handleToggle = () => {
    if (disabled) return;
    if (!value) onChange?.(formatTimeStr(0, 0));
    setIsOpen((o) => !o);
  };

  return (
    <div ref={containerRef} className={['relative', className].join(' ')}>
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={handleToggle}
        displayValue={displayValue}
        leftIcon={<Clock size={16} />}
        onClear={clearable && value ? () => onChange?.(undefined) : undefined}
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen} className="w-44">
          <div className="px-3 py-2 text-center border-b border-border">
            <span className="text-lg font-mono font-semibold text-text-primary tracking-widest">
              {formatTimeStr(hours, minutes)}
            </span>
          </div>
          <TimeColumns
            hours={hours}
            minutes={minutes}
            minuteStep={minuteStep}
            onChange={(h, m) => onChange?.(formatTimeStr(h, m))}
          />
          <ConfirmButton onClick={() => setIsOpen(false)} />
        </Dropdown>
      )}
    </div>
  );
}

// ─── DateTimePicker ───────────────────────────────────────────────────────────

export function DateTimePicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'DD/MM/AAAA HH:MM',
  min,
  max,
  lockToMonthYear,
  minuteStep = 1,
  disabled = false,
  clearable = true,
  className = '',
}: DateTimePickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();
  const { year, month, prevMonth, nextMonth } = useMonthNavigation(value, lockToMonthYear);
  const merged =
    lockToMonthYear !== undefined
      ? mergeMinMaxWithMonthLock(lockToMonthYear, min, max)
      : { min, max };

  const hours = value?.getHours() ?? 0;
  const minutes = value?.getMinutes() ?? 0;

  const displayValue = value ? (
    <span className="text-text-primary">{formatDateTime(value)}</span>
  ) : (
    <span className="text-text-muted">{placeholder}</span>
  );

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    onChange?.(newDate);
  };

  const handleTimeChange = (h: number, m: number) => {
    const base = value ?? new Date();
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m);
    onChange?.(newDate);
  };

  return (
    <div ref={containerRef} className={['relative', className].join(' ')}>
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={() => !disabled && setIsOpen((o) => !o)}
        displayValue={displayValue}
        leftIcon={<Calendar size={16} />}
        onClear={
          clearable && value ? () => onChange?.(undefined) : undefined
        }
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen}>
          <div className="flex">
            <CalendarGrid
              year={year}
              month={month}
              selected={value}
              min={merged.min}
              max={merged.max}
              onSelect={handleDateSelect}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              navigationLocked={lockToMonthYear !== undefined}
            />
            <div className="border-l border-border flex flex-col justify-center">
              <div className="px-3 py-2 text-center border-b border-border">
                <span className="text-base font-mono font-semibold text-text-primary tracking-widest">
                  {formatTimeStr(hours, minutes)}
                </span>
              </div>
              <TimeColumns
                hours={hours}
                minutes={minutes}
                minuteStep={minuteStep}
                onChange={handleTimeChange}
              />
            </div>
          </div>
          <ConfirmButton onClick={() => setIsOpen(false)} />
        </Dropdown>
      )}
    </div>
  );
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

export function DateRangePicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'DD/MM/AAAA – DD/MM/AAAA',
  min,
  max,
  lockToMonthYear,
  disabled = false,
  clearable = true,
  className = '',
}: DateRangePickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();
  const { year, month, prevMonth, nextMonth } = useMonthNavigation(value?.start, lockToMonthYear);
  const [hoverDate, setHoverDate] = useState<Date | undefined>();
  const [step, setStep] = useState<'start' | 'end'>('start');

  const start = value?.start;
  const end = value?.end;

  const merged =
    lockToMonthYear !== undefined
      ? mergeMinMaxWithMonthLock(lockToMonthYear, min, max)
      : { min, max };

  const rightYear = month === 11 ? year + 1 : year;
  const rightMonth = month === 11 ? 0 : month + 1;

  const hasValue = Boolean(start ?? end);

  const displayValue = hasValue ? (
    <span className="text-text-primary">
      {start ? formatDate(start) : '—'}&nbsp;–&nbsp;{end ? formatDate(end) : '—'}
    </span>
  ) : (
    <span className="text-text-muted">{placeholder}</span>
  );

  const handleSelect = (date: Date) => {
    if (step === 'start' || !start) {
      onChange?.({ start: date, end: undefined });
      setStep('end');
    } else if (isBeforeDay(date, start)) {
      onChange?.({ start: date, end: undefined });
      setStep('end');
    } else {
      onChange?.({ start, end: date });
      setStep('start');
      setHoverDate(undefined);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange?.({ start: undefined, end: undefined });
    setStep('start');
  };

  return (
    <div ref={containerRef} className={['relative', className].join(' ')}>
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={() => {
          if (!disabled) {
            setStep('start');
            setIsOpen((o) => !o);
          }
        }}
        displayValue={displayValue}
        leftIcon={<Calendar size={16} />}
        onClear={clearable && hasValue ? handleClear : undefined}
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen}>
          <div className="px-3 py-2 border-b border-border text-xs text-text-muted text-center">
            {step === 'start'
              ? 'Selecione a data inicial'
              : `Início: ${start ? formatDate(start) : '—'} — Selecione a data final`}
          </div>
          <div
            className={[
              lockToMonthYear !== undefined ? '' : 'flex divide-x divide-border',
            ].join(' ')}
          >
            <CalendarGrid
              year={year}
              month={month}
              rangeStart={start}
              rangeEnd={end}
              hoverDate={step === 'end' ? hoverDate : undefined}
              min={merged.min}
              max={merged.max}
              onSelect={handleSelect}
              onHoverDate={step === 'end' ? setHoverDate : undefined}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              navigationLocked={lockToMonthYear !== undefined}
            />
            {lockToMonthYear === undefined ? (
              <CalendarGrid
                year={rightYear}
                month={rightMonth}
                rangeStart={start}
                rangeEnd={end}
                hoverDate={step === 'end' ? hoverDate : undefined}
                min={merged.min}
                max={merged.max}
                onSelect={handleSelect}
                onHoverDate={step === 'end' ? setHoverDate : undefined}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
              />
            ) : null}
          </div>
        </Dropdown>
      )}
    </div>
  );
}

// ─── DateTimeRangePicker ──────────────────────────────────────────────────────

export function DateTimeRangePicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'DD/MM/AAAA HH:MM – DD/MM/AAAA HH:MM',
  min,
  max,
  lockToMonthYear,
  minuteStep = 1,
  disabled = false,
  clearable = true,
  className = '',
}: DateTimeRangePickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();
  const { year, month, prevMonth, nextMonth } = useMonthNavigation(value?.start, lockToMonthYear);
  const [hoverDate, setHoverDate] = useState<Date | undefined>();
  const [step, setStep] = useState<'start' | 'end'>('start');
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');

  const start = value?.start;
  const end = value?.end;

  const merged =
    lockToMonthYear !== undefined
      ? mergeMinMaxWithMonthLock(lockToMonthYear, min, max)
      : { min, max };

  const rightYear = month === 11 ? year + 1 : year;
  const rightMonth = month === 11 ? 0 : month + 1;

  const hasValue = Boolean(start ?? end);

  const startH = start?.getHours() ?? 0;
  const startM = start?.getMinutes() ?? 0;
  const endH = end?.getHours() ?? 0;
  const endM = end?.getMinutes() ?? 0;

  const displayValue = hasValue ? (
    <span className="text-text-primary text-xs sm:text-sm">
      {start ? formatDateTime(start) : '—'}&nbsp;–&nbsp;{end ? formatDateTime(end) : '—'}
    </span>
  ) : (
    <span className="text-text-muted">{placeholder}</span>
  );

  const handleDateSelect = (date: Date) => {
    if (step === 'start' || !start) {
      const newStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startH, startM);
      onChange?.({ start: newStart, end: undefined });
      setStep('end');
      setActiveTab('end');
    } else if (isBeforeDay(date, start)) {
      const newStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startH, startM);
      onChange?.({ start: newStart, end: undefined });
      setStep('end');
      setActiveTab('end');
    } else {
      const newEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endH, endM);
      onChange?.({ start, end: newEnd });
      setStep('start');
    }
  };

  const handleStartTimeChange = (h: number, m: number) => {
    if (!start) return;
    const newStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), h, m);
    onChange?.({ start: newStart, end });
  };

  const handleEndTimeChange = (h: number, m: number) => {
    if (!end) return;
    const newEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), h, m);
    onChange?.({ start, end: newEnd });
  };

  const handleClear = () => {
    onChange?.({ start: undefined, end: undefined });
    setStep('start');
    setActiveTab('start');
  };

  const tabCls = (active: boolean) =>
    [
      'flex-1 py-2 text-xs font-medium transition-colors border-b-2',
      active
        ? 'border-brand-primary text-brand-primary'
        : 'border-transparent text-text-muted hover:text-text-primary',
    ].join(' ');

  return (
    <div ref={containerRef} className={['relative', className].join(' ')}>
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={() => {
          if (!disabled) {
            setStep('start');
            setActiveTab('start');
            setIsOpen((o) => !o);
          }
        }}
        displayValue={displayValue}
        leftIcon={<Calendar size={16} />}
        onClear={clearable && hasValue ? handleClear : undefined}
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen}>
          {/* Selection hint */}
          <div className="px-3 py-2 border-b border-border text-xs text-text-muted text-center">
            {step === 'start'
              ? 'Selecione a data inicial'
              : `Início: ${start ? formatDateTime(start) : '—'} — Selecione a data final`}
          </div>

          <div
            className={[
              lockToMonthYear !== undefined ? '' : 'flex divide-x divide-border',
            ].join(' ')}
          >
            <CalendarGrid
              year={year}
              month={month}
              rangeStart={start}
              rangeEnd={end}
              hoverDate={step === 'end' ? hoverDate : undefined}
              min={merged.min}
              max={merged.max}
              onSelect={handleDateSelect}
              onHoverDate={step === 'end' ? setHoverDate : undefined}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              navigationLocked={lockToMonthYear !== undefined}
            />
            {lockToMonthYear === undefined ? (
              <CalendarGrid
                year={rightYear}
                month={rightMonth}
                rangeStart={start}
                rangeEnd={end}
                hoverDate={step === 'end' ? hoverDate : undefined}
                min={merged.min}
                max={merged.max}
                onSelect={handleDateSelect}
                onHoverDate={step === 'end' ? setHoverDate : undefined}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
              />
            ) : null}
          </div>

          {/* Time tabs */}
          <div className="border-t border-border">
            <div className="flex border-b border-border bg-surface-3/50">
              <button type="button" className={tabCls(activeTab === 'start')} onClick={() => setActiveTab('start')}>
                Início {start ? formatTimeStr(startH, startM) : ''}
              </button>
              <button type="button" className={tabCls(activeTab === 'end')} onClick={() => setActiveTab('end')}>
                Fim {end ? formatTimeStr(endH, endM) : ''}
              </button>
            </div>

            {activeTab === 'start' ? (
              <div>
                {start ? (
                  <>
                    <div className="px-3 py-2 text-center border-b border-border">
                      <span className="text-base font-mono font-semibold text-text-primary tracking-widest">
                        {formatTimeStr(startH, startM)}
                      </span>
                      <span className="text-xs text-text-muted ml-2">{formatDate(start)}</span>
                    </div>
                    <TimeColumns
                      hours={startH}
                      minutes={startM}
                      minuteStep={minuteStep}
                      onChange={handleStartTimeChange}
                    />
                  </>
                ) : (
                  <div className="py-6 text-center text-sm text-text-muted">
                    Selecione a data inicial no calendário
                  </div>
                )}
              </div>
            ) : (
              <div>
                {end ? (
                  <>
                    <div className="px-3 py-2 text-center border-b border-border">
                      <span className="text-base font-mono font-semibold text-text-primary tracking-widest">
                        {formatTimeStr(endH, endM)}
                      </span>
                      <span className="text-xs text-text-muted ml-2">{formatDate(end)}</span>
                    </div>
                    <TimeColumns
                      hours={endH}
                      minutes={endM}
                      minuteStep={minuteStep}
                      onChange={handleEndTimeChange}
                    />
                  </>
                ) : (
                  <div className="py-6 text-center text-sm text-text-muted">
                    Selecione a data final no calendário
                  </div>
                )}
              </div>
            )}
          </div>

          <ConfirmButton onClick={() => setIsOpen(false)} />
        </Dropdown>
      )}
    </div>
  );
}

// ─── TimeRangePicker ──────────────────────────────────────────────────────────

export function TimeRangePicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'HH:MM – HH:MM',
  minuteStep = 1,
  disabled = false,
  clearable = true,
  className = '',
}: TimeRangePickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');

  const startParsed = value?.start ? parseTimeStr(value.start) : null;
  const endParsed = value?.end ? parseTimeStr(value.end) : null;

  const startH = startParsed?.hours ?? 0;
  const startM = startParsed?.minutes ?? 0;
  const endH = endParsed?.hours ?? 0;
  const endM = endParsed?.minutes ?? 0;

  const hasValue = Boolean(value?.start ?? value?.end);

  const displayValue = hasValue ? (
    <span className="text-text-primary font-mono">
      {value?.start ?? '—'}&nbsp;–&nbsp;{value?.end ?? '—'}
    </span>
  ) : (
    <span className="text-text-muted">{placeholder}</span>
  );

  const handleToggle = () => {
    if (disabled) return;
    if (!value?.start && !value?.end) {
      onChange?.({ start: formatTimeStr(0, 0), end: formatTimeStr(1, 0) });
    }
    setIsOpen((o) => !o);
  };

  const tabCls = (active: boolean) =>
    [
      'flex-1 py-2 text-xs font-medium transition-colors border-b-2',
      active
        ? 'border-brand-primary text-brand-primary'
        : 'border-transparent text-text-muted hover:text-text-primary',
    ].join(' ');

  return (
    <div ref={containerRef} className={['relative', className].join(' ')}>
      <FieldWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={handleToggle}
        displayValue={displayValue}
        leftIcon={<Clock size={16} />}
        onClear={
          clearable && hasValue
            ? () => onChange?.({ start: undefined, end: undefined })
            : undefined
        }
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen} className="w-52">
          <div className="flex border-b border-border bg-surface-3/50">
            <button
              type="button"
              className={tabCls(activeTab === 'start')}
              onClick={() => setActiveTab('start')}
            >
              Início&nbsp;<span className="font-mono">{value?.start ?? '--:--'}</span>
            </button>
            <button
              type="button"
              className={tabCls(activeTab === 'end')}
              onClick={() => setActiveTab('end')}
            >
              Fim&nbsp;<span className="font-mono">{value?.end ?? '--:--'}</span>
            </button>
          </div>

          <div className="px-3 py-2 text-center border-b border-border">
            <span className="text-lg font-mono font-semibold text-text-primary tracking-widest">
              {activeTab === 'start' ? formatTimeStr(startH, startM) : formatTimeStr(endH, endM)}
            </span>
          </div>

          {activeTab === 'start' ? (
            <TimeColumns
              hours={startH}
              minutes={startM}
              minuteStep={minuteStep}
              onChange={(h, m) => onChange?.({ start: formatTimeStr(h, m), end: value?.end })}
            />
          ) : (
            <TimeColumns
              hours={endH}
              minutes={endM}
              minuteStep={minuteStep}
              onChange={(h, m) => onChange?.({ start: value?.start, end: formatTimeStr(h, m) })}
            />
          )}

          <ConfirmButton onClick={() => setIsOpen(false)} />
        </Dropdown>
      )}
    </div>
  );
}
