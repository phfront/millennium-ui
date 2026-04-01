'use client';

import React, { forwardRef, useId, useRef, useState } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  children: React.ReactElement;
  className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-surface-3)]',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-surface-3)]',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-surface-3)]',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-surface-3)]',
};

export function Tooltip({ content, position = 'top', children, className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {React.cloneElement(children, {
        'aria-describedby': visible ? tooltipId : undefined,
      })}
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={[
            'absolute z-50 px-2.5 py-1.5 text-xs font-medium rounded-md',
            'bg-surface-3 text-text-primary border border-border shadow-md',
            'whitespace-nowrap max-w-xs animate-fade-in',
            positionClasses[position],
            className,
          ].join(' ')}
        >
          {content}
        </span>
      )}
    </span>
  );
}
