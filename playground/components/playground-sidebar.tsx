'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, getByCategory } from '../data/components-registry';
import { Search, ChevronDown, ChevronRight, Palette, Droplets } from 'lucide-react';

export function PlaygroundSidebar() {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c, true])),
  );

  const toggle = (cat: string) =>
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <aside className="flex flex-col h-full bg-[var(--color-surface-2)] border-r border-[var(--color-border)] w-60 shrink-0">
      {/* Search */}
      <div className="px-3 py-3 border-b border-[var(--color-border)]">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            type="search"
            placeholder="Filtrar componentes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-8 pr-3 rounded-md text-xs bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)]"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {/* Tokens special link */}
        <Link
          href="/tokens"
          className={[
            'flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium mb-1',
            'transition-colors',
            pathname === '/tokens'
              ? 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]',
          ].join(' ')}
        >
          <Palette size={14} />
          Design Tokens
        </Link>

        <Link
          href="/color-lab"
          className={[
            'flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium mb-2',
            'transition-colors',
            pathname === '/color-lab'
              ? 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]',
          ].join(' ')}
        >
          <Droplets size={14} />
          Laboratório de cores
        </Link>

        <div className="h-px bg-[var(--color-border)] mb-3" />

        {categories.map((cat) => {
          const items = getByCategory(cat).filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase()),
          );
          if (search && items.length === 0) return null;

          return (
            <div key={cat} className="mb-1">
              <button
                type="button"
                onClick={() => toggle(cat)}
                className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hover:text-[var(--color-text-secondary)] transition-colors rounded-md hover:bg-[var(--color-surface-3)]"
              >
                {cat}
                {expanded[cat] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>

              {expanded[cat] && (
                <div className="mt-0.5 flex flex-col gap-0.5">
                  {items.map((item) => {
                    const href = `/components/${item.slug}`;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={item.slug}
                        href={href}
                        className={[
                          'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium',
                          'transition-colors',
                          isActive
                            ? 'bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]',
                        ].join(' ')}
                      >
                        {item.name}
                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
