'use client';

import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Skeleton } from '../skeleton/skeleton';
import { EmptyState } from '../empty-state/empty-state';

export type SortDirection = 'asc' | 'desc';

/** Valor por que uma coluna ordena. `null`/`undefined` vão sempre para o fim. */
export type SortValue = string | number | boolean | Date | null | undefined;

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: React.ReactNode;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
  /**
   * Torna o cabeçalho clicável. Sem `sortValue`, ordena pelo valor bruto em
   * `key` — o que só serve para colunas cujo dado já é o que se vê.
   */
  sortable?: boolean;
  /**
   * Chave de ordenação da coluna. Necessária sempre que o que se vê não é o
   * que está em `key` (uma coluna de cartão que mostra nome mas guarda id,
   * uma de valor que converte moeda) — sem ela a ordem sai pelo dado cru.
   */
  sortValue?: (row: T) => SortValue;
}

export interface DataTableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  keyExtractor?: (row: T, index: number) => string;
  /** Coluna ordenada na primeira renderização (modo não controlado). */
  defaultSortKey?: string;
  defaultSortDirection?: SortDirection;
  /**
   * Ordenação controlada: passe `sortKey` + `onSortChange` para a tela mandar
   * na ordem (e o DataTable deixa de ordenar sozinho, assumindo que `data` já
   * chega ordenada). Sem eles, o componente resolve tudo internamente.
   */
  sortKey?: string | null;
  sortDirection?: SortDirection;
  onSortChange?: (key: string, direction: SortDirection) => void;
}

function getValue<T>(row: T, key: string): React.ReactNode {
  return String((row as Record<string, unknown>)[key] ?? '—');
}

function defaultSortValue<T>(row: T, key: string): SortValue {
  const raw = (row as Record<string, unknown>)[key];
  if (raw == null) return null;
  if (typeof raw === 'string' || typeof raw === 'number' || typeof raw === 'boolean') return raw;
  if (raw instanceof Date) return raw;
  return String(raw);
}

/**
 * Vazio no fim em qualquer direção: inverter a ordem não é motivo para trazer
 * o que não tem valor para o topo.
 */
function compareValues(a: SortValue, b: SortValue, direction: SortDirection): number {
  const aEmpty = a == null || a === '';
  const bEmpty = b == null || b === '';
  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;
  if (bEmpty) return -1;

  const factor = direction === 'asc' ? 1 : -1;

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }) * factor;
  }
  const an = a instanceof Date ? a.getTime() : Number(a);
  const bn = b instanceof Date ? b.getTime() : Number(b);
  if (Number.isNaN(an) || Number.isNaN(bn)) {
    return String(a).localeCompare(String(b), undefined, { sensitivity: 'base' }) * factor;
  }
  return (an < bn ? -1 : an > bn ? 1 : 0) * factor;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyTitle = 'Nenhum dado encontrado',
  emptyDescription,
  emptyAction,
  keyExtractor,
  defaultSortKey,
  defaultSortDirection = 'asc',
  sortKey,
  sortDirection,
  onSortChange,
  className = '',
  ...props
}: DataTableProps<T>) {
  const isControlled = sortKey !== undefined && onSortChange !== undefined;
  const [internalSort, setInternalSort] = useState<{ key: string; direction: SortDirection } | null>(
    defaultSortKey ? { key: defaultSortKey, direction: defaultSortDirection } : null,
  );

  const activeSort = isControlled
    ? sortKey
      ? { key: sortKey, direction: sortDirection ?? 'asc' }
      : null
    : internalSort;

  function handleHeaderClick(col: DataTableColumn<T>) {
    const key = String(col.key);
    /* Primeiro clique ordena crescente; no mesmo cabeçalho, inverte. */
    const direction: SortDirection =
      activeSort?.key === key && activeSort.direction === 'asc' ? 'desc' : 'asc';
    if (isControlled) onSortChange!(key, direction);
    else setInternalSort({ key, direction });
  }

  const rows = useMemo(() => {
    /* Controlado, quem ordena é a tela — reordenar aqui seria ordenar duas vezes. */
    if (isControlled || !activeSort) return data;
    const col = columns.find((c) => String(c.key) === activeSort.key);
    if (!col) return data;
    const valueOf = col.sortValue ?? ((row: T) => defaultSortValue(row, activeSort.key));
    /* Cópia: `sort` é destrutivo e `data` é do chamador. */
    return [...data].sort((a, b) => compareValues(valueOf(a), valueOf(b), activeSort.direction));
  }, [data, columns, activeSort, isControlled]);

  return (
    <div
      className={['w-full rounded-lg border border-border overflow-hidden', className].join(' ')}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-3 border-b border-border">
            <tr>
              {columns.map((col) => {
                const key = String(col.key);
                const isSorted = activeSort?.key === key;
                const thClass =
                  'px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider';
                return (
                  <th
                    key={key}
                    scope="col"
                    style={col.width ? { width: col.width } : undefined}
                    className={thClass}
                    aria-sort={
                      isSorted
                        ? activeSort!.direction === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleHeaderClick(col)}
                        className="group inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer transition-colors hover:text-text-primary"
                      >
                        {col.header}
                        {isSorted ? (
                          activeSort!.direction === 'asc' ? (
                            <ChevronUp size={12} strokeWidth={2.5} className="text-brand-primary" />
                          ) : (
                            <ChevronDown size={12} strokeWidth={2.5} className="text-brand-primary" />
                          )
                        ) : (
                          <ChevronsUpDown
                            size={12}
                            strokeWidth={2}
                            className="opacity-0 transition-opacity group-hover:opacity-60"
                          />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface-2">
            {isLoading ? (
              Array.from({ length: 5 }, (_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      <Skeleton variant="text" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                  />
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={keyExtractor ? keyExtractor(row, i) : i}
                  className="hover:bg-surface-3 transition-colors duration-[var(--transition-fast)]"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-text-primary">
                      {col.render ? col.render(row, i) : getValue(row, String(col.key))}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
