'use client';

import React, { forwardRef, useEffect, useRef, useState, type KeyboardEvent } from 'react';

export interface IntegerSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  max: number;
  unit?: string | null;
  disabled?: boolean;
  onChange: (value: number) => void;
  /** Rótulo da meta à direita (default: "meta") */
  targetLabel?: string;
  /** Modo compacto: sem linha "meta: …" nem slider; só edição pelo valor (toque/clique). */
  compact?: boolean;
  messages?: {
    empty?: string;
    invalid?: string;
    nonInteger?: string;
    range?: (max: number) => string;
  };
}

function parseValidatedInt(
  raw: string,
  max: number,
  messages: NonNullable<IntegerSliderProps['messages']>,
): { ok: true; value: number } | { ok: false; message: string } {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return { ok: false, message: messages.empty ?? 'Informe um número.' };
  }
  const n = Number(trimmed);
  if (!Number.isFinite(n)) {
    return { ok: false, message: messages.invalid ?? 'Valor inválido.' };
  }
  if (!Number.isInteger(n)) {
    return { ok: false, message: messages.nonInteger ?? 'Use apenas números inteiros.' };
  }
  if (n < 0 || n > max) {
    return {
      ok: false,
      message: messages.range?.(max) ?? `O valor deve estar entre 0 e ${max}.`,
    };
  }
  return { ok: true, value: n };
}

export const IntegerSlider = forwardRef<HTMLDivElement, IntegerSliderProps>(
  (
    {
      value,
      max,
      unit,
      disabled = false,
      onChange,
      targetLabel = 'meta',
      compact = false,
      messages = {},
      className = '',
      ...props
    },
    ref,
  ) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState('');
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const draftRef = useRef(draft);
    draftRef.current = draft;

    useEffect(() => {
      if (!editing) return;
      const id = requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
      return () => cancelAnimationFrame(id);
    }, [editing]);

    function startEdit() {
      if (disabled) return;
      setError(null);
      setDraft(String(value));
      setEditing(true);
    }

    function cancelEdit() {
      setEditing(false);
      setError(null);
      setDraft('');
    }

    function commitEdit() {
      const trimmed = draftRef.current.trim();
      if (trimmed === '') {
        cancelEdit();
        return;
      }
      const result = parseValidatedInt(trimmed, max, messages);
      if (!result.ok) {
        setError(result.message);
        requestAnimationFrame(() => inputRef.current?.focus());
        return;
      }
      onChange(result.value);
      setEditing(false);
      setError(null);
      setDraft('');
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
        e.preventDefault();
        commitEdit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cancelEdit();
      }
    }

    const valueBlock = (
      <div className="flex flex-col items-start gap-0.5 min-w-0">
        {editing ? (
          <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setError(null);
              }}
              onBlur={() => {
                window.setTimeout(() => commitEdit(), 0);
              }}
              onKeyDown={handleKeyDown}
              className={[
                'text-2xl font-bold text-text-primary tabular-nums bg-transparent border-b-2 outline-none',
                'min-w-[4ch] max-w-[min(100%,12rem)]',
                error ? 'border-red-400' : 'border-brand-primary',
              ].join(' ')}
              aria-invalid={!!error}
              aria-label="Editar valor atual"
            />
            {unit && <span className="text-sm font-normal text-text-muted">{unit}</span>}
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={startEdit}
            className={[
              'text-left text-2xl font-bold text-text-primary tabular-nums',
              'disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer',
              'rounded-sm hover:underline decoration-text-muted/50 underline-offset-4',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1',
            ].join(' ')}
            aria-label={`Valor atual: ${value}${unit ? ` ${unit}` : ''}. Clique para editar.`}
          >
            {value}
            {unit && <span className="text-sm font-normal text-text-muted ml-1">{unit}</span>}
          </button>
        )}
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );

    return (
      <div
        ref={ref}
        className={['flex flex-col', compact ? 'gap-0' : 'gap-3', className].join(' ')}
        {...props}
      >
        {compact ? (
          valueBlock
        ) : (
          <>
            <div className="flex items-end justify-between gap-2">
              {valueBlock}
              <span className="text-sm text-text-muted shrink-0">
                {targetLabel}: {max}
                {unit ? ` ${unit}` : ''}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={max}
              value={value}
              disabled={disabled}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full h-2 rounded-full accent-brand-primary cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </>
        )}
      </div>
    );
  },
);

IntegerSlider.displayName = 'IntegerSlider';
