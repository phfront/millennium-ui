'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Moon, Sun, Hexagon, Github, Menu } from 'lucide-react';

import { Button } from '@nexus/ui';
import { useLayoutStore } from '../store';

export function PlaygroundHeader() {
  const [isDark, setIsDark] = useState(true);
  const toggleSidebar = useLayoutStore((s: any) => s.toggleSidebar);

  useEffect(() => {
    // Initialize from stored preference
    const stored = localStorage.getItem('nexus-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored === 'dark' || (!stored && prefersDark) || stored === null;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('nexus-theme', next ? 'dark' : 'light');
  };

  return (
    <header className="flex items-center justify-between h-14 px-5 border-b border-[var(--color-border)] bg-[var(--color-surface-2)] shrink-0 z-10">
      <Link href="/" className="flex items-center gap-2.5 font-bold text-[var(--color-text-primary)] no-underline">
        <Hexagon
          size={22}
          className="text-[var(--color-brand-primary)]"
          fill="currentColor"
          fillOpacity={0.15}
          strokeWidth={1.5}
        />
        <span className="text-sm">
          Nexus <span className="text-[var(--color-brand-primary)]">UI</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--color-text-muted)] hidden sm:block">
          Design System
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Alternar menu lateral"
        >
          <Menu size={18} />
        </Button>
      </div>
    </header>
  );
}
