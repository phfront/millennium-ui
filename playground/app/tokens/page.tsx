import React from 'react';

// Design Tokens Page
export default function TokensPage() {
  return (
    <div className="space-y-12 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Design Tokens</h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl">
          Tokens primários do sistema. Estas variáveis CSS são injetadas pelo <code>tailwind-preset.ts</code>
          e estão disponíveis globalmente via classes do Tailwind.
        </p>
      </header>

      {/* Colors */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)]">Cores</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            As cores adaptam-se dinamicamente ao modo escuro ou claro (classe <code>.dark</code>).
          </p>
        </div>

        <div className="space-y-6">
          <SwatchGroup title="Brand" colors={[
            { name: 'primary', var: '--color-brand-primary' },
            { name: 'secondary', var: '--color-brand-secondary' },
          ]} />
          
          <SwatchGroup title="Surface" colors={[
            { name: 'surface-1', var: '--color-surface-1' },
            { name: 'surface-2', var: '--color-surface-2' },
            { name: 'surface-3', var: '--color-surface-3' },
          ]} />

          <SwatchGroup title="Text & Border" colors={[
            { name: 'text-primary', var: '--color-text-primary' },
            { name: 'text-secondary', var: '--color-text-secondary' },
            { name: 'text-muted', var: '--color-text-muted' },
            { name: 'border', var: '--color-border' },
            { name: 'border-strong', var: '--color-border-strong' },
          ]} />

          <SwatchGroup title="Feedback" colors={[
            { name: 'success', var: '--color-success' },
            { name: 'warning', var: '--color-warning' },
            { name: 'danger', var: '--color-danger' },
            { name: 'info', var: '--color-info' },
          ]} />
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)]">Tipografia</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Usando a fonte Inter via Google Fonts ou system-ui.</p>
        </div>
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
          {[
            { tag: 'text-4xl', size: '36px', weight: '700' },
            { tag: 'text-3xl', size: '30px', weight: '700' },
            { tag: 'text-2xl', size: '24px', weight: '600' },
            { tag: 'text-xl', size: '20px', weight: '600' },
            { tag: 'text-lg', size: '18px', weight: '500' },
            { tag: 'text-base', size: '16px', weight: '400' },
            { tag: 'text-sm', size: '14px', weight: '400' },
            { tag: 'text-xs', size: '12px', weight: '400' },
          ].map((t) => (
            <div key={t.tag} className="flex items-end gap-6 border-b border-[var(--color-border)] pb-4 last:border-0 last:pb-0">
              <div className="w-24 shrink-0 font-mono text-sm text-[var(--color-text-muted)]">
                {t.tag} <br/> {t.size}
              </div>
              <div className={t.tag + " text-[var(--color-text-primary)] leading-none truncate"}>
                O rápido cão marrom
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)]">Sombras</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ShadowCard name="shadow-sm" />
          <ShadowCard name="shadow-md" />
          <ShadowCard name="shadow-glow-brand" />
        </div>
      </section>

      {/* Radius */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)]">Bordas (Radius)</h2>
        </div>
        <div className="flex flex-wrap gap-6">
          {['sm', 'md', 'lg', 'xl', 'full'].map(r => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-[var(--color-brand-primary)] rounded-${r}`} />
              <span className="font-mono text-xs text-[var(--color-text-muted)]">rounded-{r}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SwatchGroup({ title, colors }: { title: string, colors: {name:string, var:string}[] }) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-[var(--color-text-secondary)]">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {colors.map(c => (
          <div key={c.name} className="flex flex-col">
            <div 
              className="h-20 w-full rounded-t-lg border border-b-0 border-[var(--color-border)] shadow-sm"
              style={{ backgroundColor: `var(${c.var})` }}
            />
            <div className="px-3 py-2 rounded-b-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] flex flex-col gap-0.5">
              <span className="font-medium text-xs text-[var(--color-text-primary)]">{c.name}</span>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">{c.var}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShadowCard({ name }: { name: string }) {
  return (
    <div className={`p-6 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col gap-2 items-center justify-center h-32 ${name}`}>
      <span className="font-mono text-sm text-[var(--color-text-primary)] ">{name}</span>
    </div>
  );
}
