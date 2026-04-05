import React from 'react';
import Link from 'next/link';
import { Hexagon, ArrowRight, Paintbrush, Layers, MessageSquare, Compass, Database } from 'lucide-react';
import { categories, componentsRegistry, getByCategory } from '../data/components-registry';

const categoryIcons: Record<string, React.ReactNode> = {
  'Atoms': <Layers size={20} />,
  'Layout': <Hexagon size={20} />,
  'Feedback': <MessageSquare size={20} />,
  'Navegação': <Compass size={20} />,
  'Dados': <Database size={20} />,
};

export default function HomePage() {
  const totalComponents = componentsRegistry.length;

  return (
    <div className="animate-fade-in space-y-10">
      {/* Hero */}
      <section className="flex flex-col items-center text-center py-16 gap-6 rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)]/10 to-[var(--color-brand-secondary)]/10 border border-[var(--color-border)] px-6">
        <div className="w-20 h-20 rounded-2xl bg-[var(--color-brand-primary)] text-white flex items-center justify-center shadow-md">
          <Hexagon size={48} fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />
        </div>
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Design System <br className="hidden sm:block" />
            do Ecossistema Nexus
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Uma biblioteca de componentes e tokens ágil, acessível e consistente para todas as aplicações Nexus.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Link
            href="/tokens"
            className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-[var(--color-brand-primary)] hover:bg-[var(--color-surface-3)] text-white hover:text-[var(--color-brand-primary)] font-medium transition-colors shadow-[var(--shadow-glow-brand)]"
          >
            Design Tokens
          </Link>
          <Link
            href={`/components/${componentsRegistry[0]?.slug}`}
            className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md border border-[var(--color-border)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] bg-[var(--color-surface-2)] font-medium transition-colors"
          >
            Ver Componentes
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col gap-1">
          <span className="text-3xl font-bold text-[var(--color-text-primary)]">{totalComponents}</span>
          <span className="text-sm text-[var(--color-text-muted)] font-medium">Componentes</span>
        </div>
        <div className="p-5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col gap-1">
          <span className="text-3xl font-bold text-[var(--color-brand-primary)]">4</span>
          <span className="text-sm text-[var(--color-text-muted)] font-medium">Hooks utilitários</span>
        </div>
        <div className="p-5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col gap-1">
          <span className="text-3xl font-bold text-[var(--color-brand-secondary)]">2</span>
          <span className="text-sm text-[var(--color-text-muted)] font-medium">Modos de tema</span>
        </div>
        <div className="p-5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col gap-1">
          <span className="text-3xl font-bold text-[var(--color-success)]">+1k</span>
          <span className="text-sm text-[var(--color-text-muted)] font-medium">Ícones Lucide</span>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Categorias</h2>
          <p className="text-[var(--color-text-secondary)] mt-1">Navegue pelos componentes disponíveis</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Tokens Card */}
          <Link
            href="/tokens"
            className="group flex flex-col p-6 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-brand-primary)] hover:shadow-[var(--shadow-glow-brand)] transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] group-hover:bg-[var(--color-brand-primary)]/10 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] flex items-center justify-center mb-4 transition-colors">
              <Paintbrush size={20} />
            </div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Design Tokens</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">Cores, tipografia, espaçamentos e mais.</p>
            <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-primary)]">
              Explorar <ArrowRight size={14} />
            </span>
          </Link>

          {/* Component Categories */}
          {categories.map((cat) => {
            const items = getByCategory(cat);
            return (
              <Link
                key={cat}
                href={`/components/${items[0]?.slug}`}
                className="group flex flex-col p-6 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-brand-primary)] hover:shadow-[var(--shadow-glow-brand)] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] group-hover:bg-[var(--color-brand-primary)]/10 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)] flex items-center justify-center mb-4 transition-colors">
                  {categoryIcons[cat] || <Hexagon size={20} />}
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{cat}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">{items.length} componentes</p>
                <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-primary)]">
                  Ver categoria <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-6 pt-6 border-t border-[var(--color-border)]">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Início Rápido</h2>
          <p className="text-[var(--color-text-secondary)] mt-1">Como usar a biblioteca em projetos Nexus</p>
        </div>
        
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-3)] font-mono text-sm font-semibold text-[var(--color-text-secondary)]">
            1. Tailwind Config
          </div>
          <pre className="p-5 text-sm overflow-x-auto text-[var(--color-text-primary)]">
            <code className="text-[#c678dd]">import</code> <span className="text-[#e5c07b]">{`{ nexusUiPreset }`}</span> <code className="text-[#c678dd]">from</code> <span className="text-[#98c379]">'@phfront/ui/tailwind-preset'</span>;<br /><br />
            <code className="text-[#c678dd]">export default</code> {'{\n'}
            {'  '}presets: <span className="text-[#61afef]">[nexusUiPreset]</span>,<br />
            {'  '}content: <span className="text-[#61afef]">['./src/**/*.{"{ts,tsx}"}']</span><br />
            {'}'};
          </pre>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-3)] font-mono text-sm font-semibold text-[var(--color-text-secondary)]">
            2. Importando Componentes
          </div>
          <pre className="p-5 text-sm overflow-x-auto text-[var(--color-text-primary)]">
            <code className="text-[#c678dd]">import</code> <span className="text-[#e5c07b]">{`{ Button, Card, Badge }`}</span> <code className="text-[#c678dd]">from</code> <span className="text-[#98c379]">'@phfront/ui'</span>;<br /><br />
            <code className="text-[#e06c75]">{`<Card>`}</code><br />
            {'  '}<code className="text-[#e06c75]">{`<Card.Body>`}</code><br />
            {'    '}<code className="text-[#e06c75]">{`<Badge`}</code> <span className="text-[#d19a66]">variant</span>=<span className="text-[#98c379]">"success"</span><code className="text-[#e06c75]">{`>Ativo</Badge>`}</code><br />
            {'    '}<code className="text-[#e06c75]">{`<Button`}</code> <span className="text-[#d19a66]">variant</span>=<span className="text-[#98c379]">"primary"</span> <span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">"mt-4"</span><code className="text-[#e06c75]">{`>Acessar Módulo</Button>`}</code><br />
            {'  '}<code className="text-[#e06c75]">{`</Card.Body>`}</code><br />
            <code className="text-[#e06c75]">{`</Card>`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
