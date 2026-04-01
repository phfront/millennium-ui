import React from 'react';
import type { Metadata } from 'next';
import { PlaygroundSidebar } from '../components/playground-sidebar';
import { PlaygroundHeader } from '../components/playground-header';
import '@nexus/ui/styles';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexus UI Playground',
  description: 'Design System do Ecossistema Nexus',
};

import { ToastProvider } from '@nexus/ui';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased overflow-hidden">
        <ToastProvider position="bottom-right" />
        <div className="flex flex-col h-screen w-full bg-[var(--color-surface-1)]">
          <PlaygroundHeader />
          <div className="flex flex-1 overflow-hidden">
            <PlaygroundSidebar />
            <main className="flex-1 overflow-y-auto px-8 py-8">
              <div className="max-w-5xl mx-auto space-y-12 pb-24">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
