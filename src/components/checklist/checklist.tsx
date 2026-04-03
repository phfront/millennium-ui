'use client';

import React, { forwardRef } from 'react';

export type ChecklistItemOption = {
  label: string;
  /** Pontos exibidos ao lado (ex.: +1 ou -2). Omitir ou 0 para não mostrar. */
  points?: number;
};

export interface ChecklistProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onChange' | 'onToggle'> {
  items: ChecklistItemOption[];
  checked: boolean[];
  onToggle: (index: number, value: boolean) => void;
  disabled?: boolean;
}

export const Checklist = forwardRef<HTMLUListElement, ChecklistProps>(
  ({ items, checked, onToggle, disabled = false, className = '', ...props }, ref) => (
    <ul ref={ref} className={['flex flex-col gap-2', className].join(' ')} {...props}>
      {items.map((item, index) => {
        const isChecked = checked[index] ?? false;
        const pts = item.points ?? 0;
        return (
          <li key={index}>
            <label
              className={[
                'flex items-center gap-3 group',
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              ].join(' ')}
            >
              <input
                type="checkbox"
                checked={isChecked}
                disabled={disabled}
                onChange={(e) => onToggle(index, e.target.checked)}
                className={[
                  'w-5 h-5 rounded accent-brand-primary shrink-0',
                  disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                ].join(' ')}
              />
              <span
                className={[
                  'text-sm flex-1 transition-colors',
                  isChecked ? 'line-through text-text-muted' : 'text-text-primary',
                ].join(' ')}
              >
                {item.label}
              </span>
              {pts !== 0 && (
                <span
                  className={[
                    'text-xs font-medium tabular-nums',
                    pts > 0 ? 'text-success' : 'text-danger',
                  ].join(' ')}
                >
                  {pts > 0 ? '+' : ''}
                  {pts}
                </span>
              )}
            </label>
          </li>
        );
      })}
    </ul>
  ),
);

Checklist.displayName = 'Checklist';
