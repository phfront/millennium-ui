'use client';

import React, { forwardRef } from 'react';

export interface CompactStatusCheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'checked' | 'onChange'> {
  checked: boolean;
  onCheckedChange: () => void | Promise<void>;
  titleChecked?: string;
  titleUnchecked?: string;
  ariaLabelChecked?: string;
  ariaLabelUnchecked?: string;
}

/** Checkbox compacto para filas densas (ex. marcar pago/pendente). */
export const CompactStatusCheckbox = forwardRef<HTMLInputElement, CompactStatusCheckboxProps>(
  (
    {
      checked,
      onCheckedChange,
      disabled = false,
      titleChecked = 'Pago — clique para pendente',
      titleUnchecked = 'Pendente — clique para marcar pago',
      ariaLabelChecked = 'Marcar como pendente',
      ariaLabelUnchecked = 'Marcar como pago',
      className = '',
      ...props
    },
    ref,
  ) => (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      title={checked ? titleChecked : titleUnchecked}
      aria-label={checked ? ariaLabelChecked : ariaLabelUnchecked}
      onChange={() => void onCheckedChange()}
      onClick={(e) => e.stopPropagation()}
      className={[
        'size-3.5 shrink-0 rounded border border-border bg-surface-2 accent-green-500 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary',
        className,
      ].join(' ')}
      {...props}
    />
  ),
);

CompactStatusCheckbox.displayName = 'CompactStatusCheckbox';
