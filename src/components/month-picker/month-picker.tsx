'use client';

import React, { useState, useRef, useEffect, useId, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTHS_PT = [
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
] as const;

const MONTHS_SHORT_PT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
] as const;

export interface MonthYearValue {
  year: number;
  /** 0–11 (como `Date#getMonth`) */
  month: number;
}

export interface MonthPickerProps {
  /** Índice do mês 0–11 (`Date#getMonth`). */
  value?: number;
  onChange?: (month: number | undefined) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

export interface MonthYearPickerProps {
  value?: MonthYearValue;
  onChange?: (v: MonthYearValue | undefined) => void;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  /** Limite inferior (inclusive), mês 0–11. */
  min?: MonthYearValue;
  /** Limite superior (inclusive), mês 0–11. */
  max?: MonthYearValue;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function monthIndex(y: number, m: number): number {
  return y * 12 + m;
}

function isMonthDisabled(y: number, m: number, min?: MonthYearValue, max?: MonthYearValue): boolean {
  const idx = monthIndex(y, m);
  if (min && idx < monthIndex(min.year, min.month)) return true;
  if (max && idx > monthIndex(max.year, max.month)) return true;
  return false;
}

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

const monthCellCls = (selected: boolean, disabled: boolean) =>
  [
    'px-2 py-2 text-xs rounded-md text-center transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary',
    disabled
      ? 'opacity-30 cursor-not-allowed text-text-muted'
      : selected
        ? 'bg-brand-primary text-white font-semibold cursor-pointer'
        : 'text-text-primary hover:bg-surface-3 hover:text-brand-primary cursor-pointer',
  ].join(' ');

export function MonthPicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'Selecione o mês',
  disabled = false,
  clearable = true,
  className = '',
}: MonthPickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();

  const displayValue =
    value !== undefined && value >= 0 && value <= 11 ? (
      <span className="text-text-primary">{MONTHS_PT[value]}</span>
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
        onClear={clearable && value !== undefined ? () => onChange?.(undefined) : undefined}
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen}>
          <div className="p-3 w-[280px] select-none">
            <div className="grid grid-cols-3 gap-1.5">
              {MONTHS_SHORT_PT.map((shortName, idx) => (
                <button
                  key={shortName}
                  type="button"
                  aria-label={MONTHS_PT[idx]}
                  aria-pressed={value === idx}
                  onClick={() => {
                    onChange?.(idx);
                    setIsOpen(false);
                  }}
                  className={monthCellCls(value === idx, false)}
                >
                  {shortName}
                </button>
              ))}
            </div>
          </div>
        </Dropdown>
      )}
    </div>
  );
}

export function MonthYearPicker({
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder = 'Mês / ano',
  min,
  max,
  disabled = false,
  clearable = true,
  className = '',
}: MonthYearPickerProps) {
  const id = useId();
  const { isOpen, setIsOpen, containerRef, panelRef } = useDropdown();

  const base = value ?? { year: new Date().getFullYear(), month: new Date().getMonth() };
  const [viewYear, setViewYear] = useState(base.year);

  useEffect(() => {
    if (value) setViewYear(value.year);
  }, [value?.year, isOpen]);

  const displayValue =
    value !== undefined ? (
      <span className="text-text-primary">
        {MONTHS_PT[value.month]} {value.year}
      </span>
    ) : (
      <span className="text-text-muted">{placeholder}</span>
    );

  const prevYear = () => setViewYear((y) => y - 1);
  const nextYear = () => setViewYear((y) => y + 1);

  const nextDisabled =
    max !== undefined && monthIndex(viewYear + 1, 0) > monthIndex(max.year, max.month);
  const prevDisabled =
    min !== undefined && monthIndex(viewYear - 1, 11) < monthIndex(min.year, min.month);

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
        onClear={clearable && value !== undefined ? () => onChange?.(undefined) : undefined}
      />
      {isOpen && (
        <Dropdown anchorRef={containerRef} panelRef={panelRef} isOpen={isOpen}>
          <div className="p-3 w-[280px] select-none">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevYear}
                disabled={prevDisabled}
                aria-label="Ano anterior"
                className={[
                  'p-1.5 rounded-md transition-colors',
                  prevDisabled
                    ? 'text-text-muted cursor-not-allowed'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-3',
                ].join(' ')}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-text-primary tabular-nums">{viewYear}</span>
              <button
                type="button"
                onClick={nextYear}
                disabled={nextDisabled}
                aria-label="Próximo ano"
                className={[
                  'p-1.5 rounded-md transition-colors',
                  nextDisabled
                    ? 'text-text-muted cursor-not-allowed'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-3',
                ].join(' ')}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {MONTHS_SHORT_PT.map((shortName, idx) => {
                const dis = isMonthDisabled(viewYear, idx, min, max);
                const selected =
                  value !== undefined && value.year === viewYear && value.month === idx;
                return (
                  <button
                    key={shortName}
                    type="button"
                    aria-label={`${MONTHS_PT[idx]} ${viewYear}`}
                    aria-pressed={selected}
                    disabled={dis}
                    onClick={() => {
                      if (dis) return;
                      onChange?.({ year: viewYear, month: idx });
                      setIsOpen(false);
                    }}
                    className={monthCellCls(selected, dis)}
                  >
                    {shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </Dropdown>
      )}
    </div>
  );
}
