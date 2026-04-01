'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: any) => void;
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options = [],
  value,
  onChange,
  multiple = false,
  searchable = false,
  placeholder = 'Selecione...',
  label,
  error,
  disabled = false,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter((v) => v !== optionValue));
    }
  };

  const clearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearch('');
  };

  const filteredOptions = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  // Render the selected value(s)
  const renderValue = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return <span className="text-text-muted">{placeholder}</span>;
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 bg-surface-3 text-xs px-2 py-0.5 rounded text-text-primary"
              >
                {opt?.label || v}
                <button
                  type="button"
                  onClick={(e) => handleRemove(v, e)}
                  className="hover:text-danger focus:outline-none"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      );
    } else {
      if (!value) return <span className="text-text-muted">{placeholder}</span>;
      const selectedOption = options.find((o) => o.value === value);
      return <span className="truncate">{selectedOption?.label || value}</span>;
    }
  };

  return (
    <div className={['relative w-full text-sm', className].join(' ')} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        onClick={handleToggle}
        className={[
          'flex min-h-[40px] w-full items-center justify-between rounded-md border px-3 py-2 transition-colors cursor-pointer',
          disabled ? 'opacity-50 cursor-not-allowed bg-surface-3' : 'bg-surface-2 hover:border-brand-primary',
          error ? 'border-danger focus-within:ring-1 focus-within:ring-danger' : 'border-border focus-within:ring-1 focus-within:ring-brand-primary',
          isOpen ? 'ring-1 ring-brand-primary' : '',
        ].join(' ')}
      >
        <div className="flex-1 overflow-hidden">{renderValue()}</div>
        <ChevronDown
          size={16}
          className={['shrink-0 text-text-secondary transition-transform', isOpen ? 'rotate-180' : ''].join(' ')}
        />
      </div>

      {/* Error Message */}
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-surface-2 border border-border rounded-md shadow-lg py-1 animate-fade-in origin-top">
          {searchable && (
            <div className="p-2 border-b border-border sticky top-0 bg-surface-2">
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-2.5 text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar..."
                  className="w-full h-8 pl-8 pr-8 text-sm bg-surface-1 border border-border rounded outline-none focus:border-brand-primary text-text-primary"
                  onClick={(e) => e.stopPropagation()}
                />
                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2.5 text-text-muted hover:text-text-primary"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-center text-text-muted text-sm border-t border-border mt-1">
                Nenhum resultado encontrado
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = multiple
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value;

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={[
                      'flex items-center justify-between px-3 py-2 cursor-pointer transition-colors',
                      isSelected ? 'bg-surface-3 text-brand-primary font-medium' : 'text-text-primary hover:bg-surface-3 hover:text-brand-primary',
                    ].join(' ')}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && <Check size={16} className="shrink-0" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
