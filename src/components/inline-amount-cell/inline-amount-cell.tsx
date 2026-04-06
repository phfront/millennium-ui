'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface InlineAmountCellProps {
  value: number;
  onSave: (value: number) => Promise<void> | void;
  formatDisplay: (value: number) => string;
  parseInput: (raw: string) => number;
  className?: string;
  disabled?: boolean;
  emptyDisplay?: string;
  /** Ex.: realçar célula quando `highlightActive` e valor não vazio. */
  highlightVariant?: 'none' | 'success';
  highlightActive?: boolean;
}

export function InlineAmountCell({
  value,
  onSave,
  formatDisplay,
  parseInput,
  className = '',
  disabled = false,
  emptyDisplay = '—',
  highlightVariant = 'none',
  highlightActive = false,
}: InlineAmountCellProps) {
    const [editing, setEditing] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [saving, setSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Sem `className`: estilo compacto (ex.: planilha de receitas).
     * Com `className`: só o que o pai define (evita `text-xs`/`py-0.5` a competir com `!text-sm`/`py-1.5`).
     */
    const layoutClasses =
      className.trim() === ''
        ? 'block w-full min-w-0 max-w-full text-right text-xs leading-normal px-1 py-0.5 rounded border border-transparent'
        : `block w-full min-w-0 max-w-full text-right ${className.trim()}`;

    useEffect(() => {
      if (editing && inputRef.current) {
        inputRef.current.select();
      }
    }, [editing]);

    const startEdit = useCallback(() => {
      if (disabled) return;
      setInputVal(value > 0 ? String(value) : '');
      setEditing(true);
    }, [disabled, value]);

    const confirm = useCallback(async () => {
      const parsed = parseInput(inputVal);
      setEditing(false);
      if (parsed !== value) {
        setSaving(true);
        try {
          await onSave(parsed);
        } finally {
          setSaving(false);
        }
      }
    }, [inputVal, onSave, parseInput, value]);

    const cancel = useCallback(() => {
      setEditing(false);
    }, []);

    const isEmpty = value === 0 || value == null;
    const successHighlight =
      highlightVariant === 'success' && Boolean(highlightActive) && !isEmpty;
    const paidClasses = successHighlight
      ? 'bg-green-600/30 text-green-100 ring-1 ring-inset ring-green-400/45 hover:bg-green-600/40'
      : '';

    if (editing) {
      return (
        <div className="min-w-0 w-full max-w-full">
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onBlur={() => void confirm()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void confirm();
              if (e.key === 'Escape') cancel();
            }}
            className={`${layoutClasses} box-border m-0 appearance-none shadow-none outline-none cursor-text [-webkit-touch-callout:none] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
              ${isEmpty ? 'text-text-muted' : 'text-text-primary'}
              ${successHighlight ? '' : !className.trim() ? 'bg-surface-3' : ''}
              ${paidClasses}
              ${successHighlight ? '' : 'ring-1 ring-inset ring-brand-primary'}`}
            autoFocus
          />
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={startEdit}
        disabled={disabled || saving}
        className={`${layoutClasses} select-none transition-colors cursor-pointer [-webkit-touch-callout:none] disabled:cursor-pointer
        ${isEmpty ? 'text-text-muted hover:text-text-secondary' : 'text-text-primary'}
        ${successHighlight ? '' : 'hover:bg-surface-3'}
        ${paidClasses}
        ${saving ? 'opacity-50' : ''}`}
      >
        {saving ? '...' : isEmpty ? emptyDisplay : formatDisplay(value)}
      </button>
    );
}
