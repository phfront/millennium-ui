import React, { forwardRef } from 'react';
import { Skeleton } from '../skeleton/skeleton';
import { EmptyState } from '../empty-state/empty-state';

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  keyExtractor?: (row: T, index: number) => string;
}

function getValue<T>(row: T, key: string): React.ReactNode {
  return String((row as Record<string, unknown>)[key] ?? '—');
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyTitle = 'Nenhum dado encontrado',
  emptyDescription,
  emptyAction,
  keyExtractor,
  className = '',
  ...props
}: DataTableProps<T>) {
  return (
    <div
      className={['w-full rounded-lg border border-border overflow-hidden', className].join(' ')}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-3 border-b border-border">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
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
            ) : data.length === 0 ? (
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
              data.map((row, i) => (
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
