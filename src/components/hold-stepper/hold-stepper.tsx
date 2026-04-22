'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface HoldStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  max?: number | null;
  unit?: string | null;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  /** Quando false, oculta a barra de progresso inferior (ex.: cartão compacto / widget). */
  showProgressBar?: boolean;
}

const HOLD_BEFORE_REPEAT_MS = 450;
const REPEAT_INTERVAL_MS = 55;

const btnClass =
  'w-11 h-11 rounded-full bg-surface-3 flex items-center justify-center text-text-primary hover:bg-brand-primary/20 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors select-none touch-manipulation';

export const HoldStepper = forwardRef<HTMLDivElement, HoldStepperProps>(
  (
    {
      value,
      max,
      unit,
      step = 1,
      disabled = false,
      onChange,
      showProgressBar = true,
      className = '',
      ...props
    },
    ref,
  ) => {
    const percent = max && max > 0 ? Math.min(100, (value / max) * 100) : null;

    const isPressingRef = useRef(false);
    const lastRef = useRef(value);
    const holdTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const repeatTimerRef = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
      if (!isPressingRef.current) {
        lastRef.current = value;
      }
    }, [value]);

    useEffect(
      () => () => {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        if (repeatTimerRef.current) clearInterval(repeatTimerRef.current);
      },
      [],
    );

    function clearRepeat() {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = undefined;
      }
      if (repeatTimerRef.current) {
        clearInterval(repeatTimerRef.current);
        repeatTimerRef.current = undefined;
      }
      isPressingRef.current = false;
    }

    function startRepeat(direction: -1 | 1) {
      if (disabled) return;
      clearRepeat();
      isPressingRef.current = true;
      lastRef.current = value;

      const applyStep = () => {
        if (direction === -1) {
          if (lastRef.current <= 0) return false;
          lastRef.current = Math.max(0, lastRef.current - step);
        } else {
          if (max != null && lastRef.current >= max) return false;
          lastRef.current = max != null ? Math.min(max, lastRef.current + step) : lastRef.current + step;
        }
        onChange(lastRef.current);
        return true;
      };

      if (!applyStep()) {
        isPressingRef.current = false;
        return;
      }

      holdTimerRef.current = setTimeout(() => {
        holdTimerRef.current = undefined;
        repeatTimerRef.current = setInterval(() => {
          if (!applyStep()) {
            clearRepeat();
          }
        }, REPEAT_INTERVAL_MS);
      }, HOLD_BEFORE_REPEAT_MS);
    }

    return (
      <div ref={ref} className={['flex flex-col gap-2', className].join(' ')} {...props}>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={disabled || value <= 0}
            className={btnClass}
            onPointerDown={(e) => {
              e.preventDefault();
              startRepeat(-1);
            }}
            onPointerUp={clearRepeat}
            onPointerLeave={clearRepeat}
            onPointerCancel={clearRepeat}
          >
            <Minus size={18} />
          </button>

          <div className="flex-1 flex flex-col items-center">
            <span className="text-2xl font-bold text-text-primary tabular-nums">{value}</span>
            {unit && <span className="text-xs text-text-muted">{unit}</span>}
          </div>

          <button
            type="button"
            disabled={disabled || (max != null && value >= max)}
            className={btnClass}
            onPointerDown={(e) => {
              e.preventDefault();
              startRepeat(1);
            }}
            onPointerUp={clearRepeat}
            onPointerLeave={clearRepeat}
            onPointerCancel={clearRepeat}
          >
            <Plus size={18} />
          </button>
        </div>

        {showProgressBar && max != null && (
          <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-primary transition-all duration-300"
              style={{ width: `${percent ?? 0}%` }}
            />
          </div>
        )}
      </div>
    );
  },
);

HoldStepper.displayName = 'HoldStepper';
