'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Leaf,
  Sprout,
  TreePine,
  Flower2,
  Clover,
  Bug,
  Bean,
  Apple,
  Cherry,
  Palette,
  Flame,
  Droplets,
  Sun,
  Moon,
  Star,
  Heart,
  Zap,
  Gem,
  Cloud,
  Waves,
  type LucideIcon,
} from 'lucide-react';

import { Card, Button } from '@nexus/ui';

type SwatchDef = {
  id: string;
  label: string;
  hint: string;
  defaultHex: string;
  icon: LucideIcon;
  group: 'green' | 'varied';
};

const SWATCHES: SwatchDef[] = [
  // 10 verdes
  { id: 'g1', label: 'Floresta', hint: 'Verde profundo', defaultHex: '#14532d', icon: TreePine, group: 'green' },
  { id: 'g2', label: 'Musgo', hint: 'Verde oliva', defaultHex: '#3f6212', icon: Leaf, group: 'green' },
  { id: 'g3', label: 'Erva', hint: 'Green 700', defaultHex: '#15803d', icon: Sprout, group: 'green' },
  { id: 'g4', label: 'Folha', hint: 'Green 600', defaultHex: '#16a34a', icon: Flower2, group: 'green' },
  { id: 'g5', label: 'Prado', hint: 'Green 500', defaultHex: '#22c55e', icon: Clover, group: 'green' },
  { id: 'g6', label: 'Menta', hint: 'Esmeralda', defaultHex: '#10b981', icon: Bug, group: 'green' },
  { id: 'g7', label: 'Teal', hint: 'Verde-água', defaultHex: '#0d9488', icon: Droplets, group: 'green' },
  { id: 'g8', label: 'Limão', hint: 'Green 400', defaultHex: '#4ade80', icon: Bean, group: 'green' },
  { id: 'g9', label: 'Maçã', hint: 'Accent claro', defaultHex: '#86efac', icon: Apple, group: 'green' },
  { id: 'g10', label: 'Onda', hint: 'Teal claro', defaultHex: '#2dd4bf', icon: Waves, group: 'green' },
  // 10 variadas
  { id: 'v1', label: 'Coral', hint: 'Quente', defaultHex: '#f97316', icon: Flame, group: 'varied' },
  { id: 'v2', label: 'Sol', hint: 'Âmbar', defaultHex: '#eab308', icon: Sun, group: 'varied' },
  { id: 'v3', label: 'Rosa', hint: 'Pink', defaultHex: '#db2777', icon: Heart, group: 'varied' },
  { id: 'v4', label: 'Uva', hint: 'Violeta', defaultHex: '#7c3aed', icon: Gem, group: 'varied' },
  { id: 'v5', label: 'Oceano', hint: 'Azul', defaultHex: '#2563eb', icon: Cloud, group: 'varied' },
  { id: 'v6', label: 'Índigo', hint: 'Profundo', defaultHex: '#4f46e5', icon: Star, group: 'varied' },
  { id: 'v7', label: 'Ardósia', hint: 'Neutro frio', defaultHex: '#64748b', icon: Moon, group: 'varied' },
  { id: 'v8', label: 'Raio', hint: 'Amarelo-limão', defaultHex: '#ca8a04', icon: Zap, group: 'varied' },
  { id: 'v9', label: 'Cereja', hint: 'Vermelho', defaultHex: '#dc2626', icon: Cherry, group: 'varied' },
  { id: 'v10', label: 'Ameixa', hint: 'Fúcsia', defaultHex: '#c026d3', icon: Palette, group: 'varied' },
];

function parseHex(raw: string): string | null {
  const t = raw.trim();
  const m = t.match(/^#?([0-9a-fA-F]{6})$/);
  return m ? `#${m[1].toLowerCase()}` : null;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const p = parseHex(hex);
  if (!p) return null;
  const n = parseInt(p.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(0,0,0,${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function syncDarkClass(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('nexus-theme', isDark ? 'dark' : 'light');
}

function readInitialDark(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('nexus-theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ColorLabPage() {
  const initialColors = useMemo(
    () => Object.fromEntries(SWATCHES.map((s) => [s.id, s.defaultHex])) as Record<string, string>,
    [],
  );
  const [colors, setColors] = useState<Record<string, string>>(initialColors);
  const [hexDraft, setHexDraft] = useState<Record<string, string>>(initialColors);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const dark = readInitialDark();
    setIsDark(dark);
    syncDarkClass(dark);
  }, []);

  const setMode = useCallback((dark: boolean) => {
    setIsDark(dark);
    syncDarkClass(dark);
  }, []);

  const updateColor = useCallback((id: string, hex: string) => {
    const valid = parseHex(hex);
    if (!valid) return;
    setColors((prev) => ({ ...prev, [id]: valid }));
    setHexDraft((prev) => ({ ...prev, [id]: valid }));
  }, []);

  const onHexInput = useCallback((id: string, raw: string) => {
    setHexDraft((prev) => ({ ...prev, [id]: raw }));
    const valid = parseHex(raw);
    if (valid) setColors((prev) => ({ ...prev, [id]: valid }));
  }, []);

  const onHexBlur = useCallback(
    (id: string) => {
      const valid = parseHex(hexDraft[id] ?? '');
      if (valid) {
        setHexDraft((prev) => ({ ...prev, [id]: valid }));
        setColors((prev) => ({ ...prev, [id]: valid }));
      } else {
        setHexDraft((prev) => ({ ...prev, [id]: colors[id] ?? '#000000' }));
      }
    },
    [colors, hexDraft],
  );

  const resetAll = useCallback(() => {
    setColors(initialColors);
    setHexDraft(initialColors);
  }, [initialColors]);

  const greens = SWATCHES.filter((s) => s.group === 'green');
  const varied = SWATCHES.filter((s) => s.group === 'varied');

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      <header className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Laboratório de cores</h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl text-sm leading-relaxed">
              Experimente acentos em cards no estilo do design system. Cada card tem seletor nativo e campo hex. O fundo
              da página segue os tokens <code className="text-xs font-mono">surface</code> do tema — alterne claro/escuro
              para ver contraste.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:items-end shrink-0">
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
              Aparência
            </span>
            <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] p-1">
              <button
                type="button"
                onClick={() => setMode(false)}
                className={[
                  'px-4 py-2 rounded-md text-xs font-semibold transition-colors',
                  !isDark
                    ? 'bg-[var(--color-surface-1)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                ].join(' ')}
              >
                Claro
              </button>
              <button
                type="button"
                onClick={() => setMode(true)}
                className={[
                  'px-4 py-2 rounded-md text-xs font-semibold transition-colors',
                  isDark
                    ? 'bg-[var(--color-surface-3)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                ].join(' ')}
              >
                Escuro
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={resetAll} className="w-full sm:w-auto">
              Repor cores padrão
            </Button>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">
          Verdes ({greens.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {greens.map((s) => (
            <AccentCard
              key={s.id}
              def={s}
              hex={colors[s.id] ?? s.defaultHex}
              hexInput={hexDraft[s.id] ?? colors[s.id] ?? s.defaultHex}
              onColorPick={(h) => updateColor(s.id, h)}
              onHexInput={(v) => onHexInput(s.id, v)}
              onHexBlur={() => onHexBlur(s.id)}
              badge="Verde"
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">
          Variadas ({varied.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {varied.map((s) => (
            <AccentCard
              key={s.id}
              def={s}
              hex={colors[s.id] ?? s.defaultHex}
              hexInput={hexDraft[s.id] ?? colors[s.id] ?? s.defaultHex}
              onColorPick={(h) => updateColor(s.id, h)}
              onHexInput={(v) => onHexInput(s.id, v)}
              onHexBlur={() => onHexBlur(s.id)}
              badge="Variada"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function AccentCard({
  def,
  hex,
  hexInput,
  onColorPick,
  onHexInput,
  onHexBlur,
  badge,
}: {
  def: SwatchDef;
  hex: string;
  hexInput: string;
  onColorPick: (hex: string) => void;
  onHexInput: (v: string) => void;
  onHexBlur: () => void;
  badge: string;
}) {
  const Icon = def.icon;
  const safe = parseHex(hex) ?? def.defaultHex;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-[var(--transition-fast)]">
      <Card.Header className="items-start gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-semibold text-text-primary truncate">{def.label}</span>
          <span className="text-xs text-text-muted">{def.hint}</span>
        </div>
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-surface-3 text-text-secondary border border-border">
          {badge}
        </span>
      </Card.Header>
      <Card.Body className="space-y-4">
        <div className="flex gap-3 items-stretch">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-xl border border-border shrink-0 transition-colors duration-[var(--transition-fast)]"
            style={{
              backgroundColor: withAlpha(safe, 0.18),
              color: safe,
              boxShadow: `0 0 0 1px ${withAlpha(safe, 0.25)}`,
            }}
          >
            <Icon size={26} strokeWidth={1.75} />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2 min-w-0">
            <div
              className="h-2.5 rounded-full w-full"
              style={{
                background: `linear-gradient(90deg, ${safe}, ${withAlpha(safe, 0.15)})`,
              }}
            />
            <p className="text-xs text-text-secondary leading-snug">
              Simulação de <strong className="text-text-primary">marca / CTA</strong> com a cor escolhida.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-border">
          <label className="flex items-center gap-2 cursor-pointer group">
            <span className="sr-only">Seletor de cor para {def.label}</span>
            <input
              type="color"
              value={safe}
              onChange={(e) => onColorPick(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-md border border-border bg-surface-1 p-0.5 shadow-sm [color-scheme:light] dark:[color-scheme:dark]"
              aria-label={`Cor de ${def.label}`}
            />
            <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">
              Seletor
            </span>
          </label>
          <div className="flex-1 min-w-[7rem]">
            <label className="block text-[10px] font-medium text-text-muted uppercase tracking-wide mb-1">
              Hex
            </label>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => onHexInput(e.target.value)}
              onBlur={onHexBlur}
              spellCheck={false}
              className="w-full font-mono text-sm px-3 py-2 rounded-md border border-border bg-surface-1 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
              placeholder="#16a34a"
              maxLength={7}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
