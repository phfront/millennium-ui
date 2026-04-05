import React from 'react';
import { notFound } from 'next/navigation';
import { getBySlug, componentsRegistry } from '../../../data/components-registry';
// @nexus-ui is imported later via client code example
import { ComponentPreview } from '../../../components/component-preview';
import { CodeBlock } from '../../../components/code-block';
import { PropsTable } from '../../../components/props-table';
import { DemoRenderer } from './demo-renderer';
import * as NexusUI from '@phfront/ui';

export function generateStaticParams() {
  return componentsRegistry.map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = getBySlug(slug);

  if (!comp) {
    notFound();
  }

  // Create a placeholder name like Button, Input
  const compName = comp.name as keyof typeof NexusUI;

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="space-y-3 border-b border-[var(--color-border)] pb-6">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{comp.name}</h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">{comp.description}</p>
        <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded-md bg-[var(--color-surface-3)] text-[var(--color-text-muted)] text-xs font-mono border border-[var(--color-border)] shadow-sm">
          import {`{ ${comp.name} }`} from '@phfront/ui';
        </div>
      </header>

      {/* Generic Demo */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Exemplo Básico</h2>
        
        <ComponentPreview label="Preview">
           <DemoRenderer componentName={comp.name} />
        </ComponentPreview>
        
        <CodeBlock code={`<${comp.name} />`} />
      </section>

      {/* Props */}
      <section className="space-y-4 pt-8">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Propriedades</h2>
        <PropsTable props={[
           { name: 'className', type: 'string', description: 'Classes CSS adicionais (Tailwind)' },
           { name: '...', type: 'any', description: 'Consulte a tipagem para as propriedades nativas herdadas.' },
        ]} />
      </section>
    </div>
  );
}
