export type ComponentCategory =
  | 'Atoms'
  | 'Layout'
  | 'Feedback'
  | 'Navegação'
  | 'Dados';

export interface ComponentEntry {
  slug: string;
  name: string;
  description: string;
  category: ComponentCategory;
}

export const componentsRegistry: ComponentEntry[] = [
  // Atoms
  { slug: 'button', name: 'Button', description: 'Botão de ação com variantes e estados.', category: 'Atoms' },
  { slug: 'select', name: 'Select', description: 'Menu dropdown com pesquisa e múltipla escolha.', category: 'Atoms' },
  { slug: 'input', name: 'Input', description: 'Campo de texto com label, erro e ícones.', category: 'Atoms' },
  { slug: 'textarea', name: 'Textarea', description: 'Área de texto com resize automático.', category: 'Atoms' },
  { slug: 'badge', name: 'Badge', description: 'Etiqueta de status com variantes semânticas.', category: 'Atoms' },
  { slug: 'avatar', name: 'Avatar', description: 'Foto de perfil com fallback de iniciais.', category: 'Atoms' },
  { slug: 'icon', name: 'Icon', description: 'Wrapper dinâmico sobre ícones Lucide.', category: 'Atoms' },
  { slug: 'spinner', name: 'Spinner', description: 'Indicador de carregamento animado.', category: 'Atoms' },
  { slug: 'switch', name: 'Switch', description: 'Toggle booleano acessível.', category: 'Atoms' },
  { slug: 'divider', name: 'Divider', description: 'Linha separadora horizontal ou vertical.', category: 'Atoms' },
  // Layout
  { slug: 'card', name: 'Card', description: 'Container com Header, Body e Footer.', category: 'Layout' },
  { slug: 'page-header', name: 'PageHeader', description: 'Cabeçalho de página com título e ações.', category: 'Layout' },
  { slug: 'empty-state', name: 'EmptyState', description: 'Estado vazio com ícone e CTA.', category: 'Layout' },
  { slug: 'skeleton', name: 'Skeleton', description: 'Placeholder de carregamento shimmer.', category: 'Layout' },
  // Feedback
  { slug: 'alert', name: 'Alert', description: 'Alerta inline com variantes semânticas.', category: 'Feedback' },
  { slug: 'toast', name: 'Toast', description: 'Notificações temporárias via hook.', category: 'Feedback' },
  { slug: 'modal', name: 'Modal', description: 'Dialog acessível com overlay.', category: 'Feedback' },
  { slug: 'tooltip', name: 'Tooltip', description: 'Dica de contexto ao hover/focus.', category: 'Feedback' },
  // Navegação
  { slug: 'sidebar', name: 'Sidebar', description: 'Navegação lateral colapsável.', category: 'Navegação' },
  { slug: 'bottom-nav', name: 'BottomNav', description: 'Navegação inferior para mobile.', category: 'Navegação' },
  { slug: 'nav-item', name: 'NavItem', description: 'Item de link de navegação.', category: 'Navegação' },
  // Dados
  { slug: 'module-card', name: 'ModuleCard', description: 'Card de módulo do ecossistema Nexus.', category: 'Dados' },
  { slug: 'data-table', name: 'DataTable', description: 'Tabela com loading, vazio e colunas configuráveis.', category: 'Dados' },
];

export const categories: ComponentCategory[] = ['Atoms', 'Layout', 'Feedback', 'Navegação', 'Dados'];

export function getByCategory(category: ComponentCategory): ComponentEntry[] {
  return componentsRegistry.filter((c) => c.category === category);
}

export function getBySlug(slug: string): ComponentEntry | undefined {
  return componentsRegistry.find((c) => c.slug === slug);
}
