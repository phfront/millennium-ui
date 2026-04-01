import React from 'react';

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function ComponentPreview({ children, className = '', label }: ComponentPreviewProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] flex flex-col">
      {label && (
        <div className="px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface-3)] rounded-t-xl">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">{label}</span>
        </div>
      )}
      <div
        className={[
          'flex flex-wrap items-start gap-4 p-8 bg-[var(--color-surface-1)]',
          label ? 'rounded-b-xl' : 'rounded-xl',
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}
