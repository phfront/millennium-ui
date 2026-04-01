import React from 'react';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
      <table className="w-full text-xs">
        <thead className="bg-[var(--color-surface-3)] border-b border-[var(--color-border)]">
          <tr>
            {['Prop', 'Tipo', 'Padrão', 'Descrição'].map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-left font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface-2)]">
          {props.map((row) => (
            <tr key={row.name}>
              <td className="px-4 py-3 font-mono font-medium text-[var(--color-brand-primary)]">
                {row.name}
                {row.required && <span className="ml-1 text-[var(--color-danger)]">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-[var(--color-text-secondary)]">{row.type}</td>
              <td className="px-4 py-3 font-mono text-[var(--color-text-muted)]">
                {row.default ?? '—'}
              </td>
              <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
