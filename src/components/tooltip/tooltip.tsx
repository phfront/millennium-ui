'use client';

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  children: React.ReactElement;
  className?: string;
}

const VIEWPORT_MARGIN = 8;
const DEFAULT_MAX_TOOLTIP_WIDTH = 320;

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(n, max));
}

export function Tooltip({ content, position = 'top', children, className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [placed, setPlaced] = useState(false);
  const tooltipId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!wrap || !tip || !visible) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = Math.min(DEFAULT_MAX_TOOLTIP_WIDTH, vw - VIEWPORT_MARGIN * 2);

    tip.style.maxWidth = `${maxW}px`;
    tip.style.position = 'fixed';
    tip.style.left = '0';
    tip.style.top = '0';

    const tr = wrap.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const w = tipRect.width;
    const h = tipRect.height;

    let left = 0;
    let top = 0;

    switch (position) {
      case 'top':
        left = tr.left + tr.width / 2 - w / 2;
        top = tr.top - h - VIEWPORT_MARGIN;
        break;
      case 'bottom':
        left = tr.left + tr.width / 2 - w / 2;
        top = tr.bottom + VIEWPORT_MARGIN;
        break;
      case 'left':
        left = tr.left - w - VIEWPORT_MARGIN;
        top = tr.top + tr.height / 2 - h / 2;
        break;
      case 'right':
        left = tr.right + VIEWPORT_MARGIN;
        top = tr.top + tr.height / 2 - h / 2;
        break;
      default:
        left = tr.left + tr.width / 2 - w / 2;
        top = tr.top - h - VIEWPORT_MARGIN;
    }

    left = clamp(left, VIEWPORT_MARGIN, vw - VIEWPORT_MARGIN - w);
    top = clamp(top, VIEWPORT_MARGIN, vh - VIEWPORT_MARGIN - h);

    tip.style.left = `${Math.round(left)}px`;
    tip.style.top = `${Math.round(top)}px`;
    setPlaced(true);
  }, [visible, position]);

  useLayoutEffect(() => {
    if (!visible) {
      setPlaced(false);
      const tip = tipRef.current;
      if (tip) {
        tip.style.position = '';
        tip.style.left = '';
        tip.style.top = '';
        tip.style.maxWidth = '';
      }
      return;
    }
    updatePosition();
  }, [visible, updatePosition, content]);

  useEffect(() => {
    if (!visible) return;
    const onReposition = () => updatePosition();
    window.addEventListener('scroll', onReposition, true);
    window.addEventListener('resize', onReposition);
    return () => {
      window.removeEventListener('scroll', onReposition, true);
      window.removeEventListener('resize', onReposition);
    };
  }, [visible, updatePosition]);

  return (
    <span
      ref={wrapRef}
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
          ref={tipRef}
          id={tooltipId}
          role="tooltip"
          className={[
            'z-[100] px-2.5 py-1.5 text-xs font-medium rounded-md',
            'bg-surface-3 text-text-primary border border-border shadow-md',
            'whitespace-normal text-left leading-snug animate-fade-in',
            !placed ? 'pointer-events-none opacity-0' : '',
            className,
          ].join(' ')}
        >
          {content}
        </span>
      )}
    </span>
  );
}
