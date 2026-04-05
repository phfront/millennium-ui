'use client';

import React, { forwardRef } from 'react';
import { Switch } from '../switch/switch';

export type ToggleMatrixRow = {
  id: string;
  header: React.ReactNode;
};

export type ToggleMatrixColumn = {
  id: string;
  header: React.ReactNode;
};

export interface ToggleMatrixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Célula superior esquerda (ex.: rótulo da primeira coluna). */
  cornerHeader?: React.ReactNode;
  rows: ToggleMatrixRow[];
  columns: ToggleMatrixColumn[];
  isChecked: (rowId: string, colId: string) => boolean;
  onCheckedChange: (rowId: string, colId: string, checked: boolean) => void;
  disabled?: boolean;
  footer?: React.ReactNode;
  switchAriaLabel?: (rowId: string, colId: string) => string;
  /** Largura mínima da tabela para scroll horizontal. */
  minTableWidth?: number | string;
  /** Substituir o Switch padrão (ex.: estado de loading por célula). */
  renderCell?: (ctx: {
    rowId: string;
    colId: string;
    checked: boolean;
    disabled: boolean;
    setChecked: (next: boolean) => void;
  }) => React.ReactNode;
}

export const ToggleMatrix = forwardRef<HTMLDivElement, ToggleMatrixProps>(
  (
    {
      cornerHeader,
      rows,
      columns,
      isChecked,
      onCheckedChange,
      disabled = false,
      footer,
      switchAriaLabel,
      minTableWidth = 640,
      renderCell,
      className = '',
      ...props
    },
    ref,
  ) => {
    const minW = typeof minTableWidth === 'number' ? `${minTableWidth}px` : minTableWidth;

    return (
      <div
        ref={ref}
        className={['overflow-x-auto rounded-xl border border-border bg-surface-2', className].join(' ')}
        {...props}
      >
        <table
          className="w-full text-sm text-left border-collapse"
          style={{ minWidth: minW }}
        >
          <thead>
            <tr className="border-b border-border bg-surface-3/50">
              <th className="sticky left-0 z-10 min-w-[200px] border-r border-border/60 bg-surface-3/95 p-3 font-semibold text-text-primary shadow-[4px_0_14px_-6px_rgba(0,0,0,0.18)]">
                {cornerHeader}
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="min-w-[88px] p-3 text-center align-bottom text-sm font-medium text-text-secondary md:min-w-[100px]"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-0 hover:bg-surface-3/30"
              >
                <td className="sticky left-0 z-10 border-r border-border/60 bg-surface-2 p-3 shadow-[4px_0_14px_-6px_rgba(0,0,0,0.18)]">
                  {row.header}
                </td>
                {columns.map((col) => {
                  const checked = isChecked(row.id, col.id);
                  const setChecked = (next: boolean) => onCheckedChange(row.id, col.id, next);

                  return (
                    <td key={col.id} className="p-2 text-center align-middle">
                      <div className="flex justify-center">
                        {renderCell ? (
                          renderCell({
                            rowId: row.id,
                            colId: col.id,
                            checked,
                            disabled,
                            setChecked,
                          })
                        ) : (
                          <Switch
                            checked={checked}
                            disabled={disabled}
                            aria-label={
                              switchAriaLabel?.(row.id, col.id) ?? `Linha ${row.id} coluna ${col.id}`
                            }
                            onCheckedChange={setChecked}
                          />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {footer && <div className="border-t border-border">{footer}</div>}
      </div>
    );
  },
);

ToggleMatrix.displayName = 'ToggleMatrix';
