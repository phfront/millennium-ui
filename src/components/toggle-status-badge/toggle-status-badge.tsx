'use client';

import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface ToggleStatusBadgeProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  checked: boolean;
  onToggle: () => void | Promise<void>;
  checkedLabel?: string;
  uncheckedLabel?: string;
  size?: 'sm' | 'md';
  showIconWhenChecked?: boolean;
}

export const ToggleStatusBadge = forwardRef<HTMLButtonElement, ToggleStatusBadgeProps>(
  (
    {
      checked,
      onToggle,
      checkedLabel = 'Pago',
      uncheckedLabel = 'Pendente',
      size = 'sm',
      showIconWhenChecked = true,
      className = '',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const sizeClasses =
      size === 'sm'
        ? 'text-xs px-1.5 py-0.5 gap-0.5 min-w-[5.75rem] justify-center'
        : 'text-sm px-2 py-1 gap-1 min-w-[6.75rem] justify-center';

    return (
      <button
        ref={ref}
        type={type}
        onClick={() => void onToggle()}
        className={[
          'inline-flex shrink-0 items-center rounded-full font-medium transition-colors cursor-pointer',
          sizeClasses,
          checked
            ? 'bg-green-500/15 text-green-500 hover:bg-green-500/25'
            : 'bg-surface-3 text-text-muted hover:bg-surface-4 hover:text-text-secondary',
          className,
        ].join(' ')}
        {...props}
      >
        {checked && showIconWhenChecked && <Check size={size === 'sm' ? 10 : 12} strokeWidth={2.5} />}
        {checked ? checkedLabel : uncheckedLabel}
      </button>
    );
  },
);

ToggleStatusBadge.displayName = 'ToggleStatusBadge';
