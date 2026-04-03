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
            className="w-full min-w-0 max-w-full box-border px-1 py-0.5 text-right text-xs bg-surface-3 border border-transparent rounded outline-none text-text-primary ring-1 ring-inset ring-brand-primary"
            autoFocus
          />
        </div>
      );
    }

    const isEmpty = value === 0 || value == null;
    const successHighlight =
      highlightVariant === 'success' && Boolean(highlightActive) && !isEmpty;
    const paidClasses = successHighlight
      ? 'bg-green-600/30 text-green-100 ring-1 ring-inset ring-green-400/45 hover:bg-green-600/40'
      : '';

    return (
      <button
        type="button"
        onClick={startEdit}
        disabled={disabled || saving}
        className={`block w-full min-w-0 max-w-full select-none text-right text-xs px-1 py-0.5 rounded border border-transparent transition-colors cursor-pointer [-webkit-touch-callout:none] disabled:cursor-pointer
        ${isEmpty ? 'text-text-muted hover:text-text-secondary' : 'text-text-primary'}
        ${successHighlight ? '' : 'hover:bg-surface-3'}
        ${paidClasses}
        ${saving ? 'opacity-50' : ''}
        ${className}`}
      >
        {saving ? '...' : isEmpty ? emptyDisplay : formatDisplay(value)}
      </button>
    );
}
