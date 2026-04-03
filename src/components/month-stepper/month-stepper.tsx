'use client';

import React, { forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface MonthStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Rótulo do mês (texto já formatado pela app, ex. i18n). */
  label: React.ReactNode;
  onPrev: () => void;
  onNext: () => void;
  disableNext?: boolean;
  ariaPrevMonth?: string;
  ariaNextMonth?: string;
}

export const MonthStepper = forwardRef<HTMLDivElement, MonthStepperProps>(
  (
    {
      label,
      onPrev,
      onNext,
      disableNext = false,
      ariaPrevMonth = 'Mês anterior',
      ariaNextMonth = 'Próximo mês',
      className = '',
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={['flex items-center gap-2', className].join(' ')} {...props}>
      <button
        type="button"
        onClick={onPrev}
        className="p-1.5 rounded-lg hover:bg-surface-3 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        aria-label={ariaPrevMonth}
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm font-semibold text-text-primary min-w-[130px] text-center">{label}</span>
      <button
        type="button"
        onClick={() => !disableNext && onNext()}
        disabled={disableNext}
        className={[
          'p-1.5 rounded-lg transition-colors',
          disableNext
            ? 'text-text-muted cursor-not-allowed'
            : 'hover:bg-surface-3 text-text-secondary hover:text-text-primary cursor-pointer',
        ].join(' ')}
        aria-label={ariaNextMonth}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  ),
);

MonthStepper.displayName = 'MonthStepper';
