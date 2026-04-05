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
  { slug: 'date-picker', name: 'DatePicker', description: 'Seletor de data com calendário interativo.', category: 'Atoms' },
  { slug: 'time-picker', name: 'TimePicker', description: 'Seletor de horário com colunas de hora e minuto.', category: 'Atoms' },
  { slug: 'date-time-picker', name: 'DateTimePicker', description: 'Seletor de data e hora combinados.', category: 'Atoms' },
  { slug: 'date-range-picker', name: 'DateRangePicker', description: 'Seletor de intervalo de datas com dois calendários.', category: 'Atoms' },
  { slug: 'date-time-range-picker', name: 'DateTimeRangePicker', description: 'Seletor de intervalo com data e hora de início/fim.', category: 'Atoms' },
  { slug: 'time-range-picker', name: 'TimeRangePicker', description: 'Seletor de intervalo de horários com abas início/fim.', category: 'Atoms' },
  // Layout
  { slug: 'card', name: 'Card', description: 'Container com Header, Body e Footer.', category: 'Layout' },
  { slug: 'page-header', name: 'PageHeader', description: 'Cabeçalho de página com título e ações.', category: 'Layout' },
  { slug: 'empty-state', name: 'EmptyState', description: 'Estado vazio com ícone e CTA.', category: 'Layout' },
  { slug: 'skeleton', name: 'Skeleton', description: 'Placeholder de carregamento shimmer.', category: 'Layout' },
  {
    slug: 'stat-card',
    name: 'StatCard',
    description: 'Cartão de KPI com rótulo, valor, ícone opcional, loading e tom semântico.',
    category: 'Dados',
  },
  { slug: 'month-stepper', name: 'MonthStepper', description: 'Navegação mês a mês com rótulo fornecido pela app.', category: 'Atoms' },
  {
    slug: 'inline-amount-cell',
    name: 'InlineAmountCell',
    description: 'Célula editável de montante com format/parse injetados (planilhas).',
    category: 'Atoms',
  },
  {
    slug: 'toggle-status-badge',
    name: 'ToggleStatusBadge',
    description: 'Pílula clicável com dois estados (ex. Pago / Pendente).',
    category: 'Atoms',
  },
  {
    slug: 'compact-status-checkbox',
    name: 'CompactStatusCheckbox',
    description: 'Checkbox compacto para linhas densas (estado sim/não).',
    category: 'Atoms',
  },
  { slug: 'range-progress-bar', name: 'RangeProgressBar', description: 'Barra de progresso com rótulos nas extremidades e indicador central.', category: 'Layout' },
  { slug: 'delta-badge', name: 'DeltaBadge', description: 'Selo de variação numérica com ícone de tendência e semântica invertível.', category: 'Atoms' },
  { slug: 'stepper-field', name: 'StepperField', description: 'Campo numérico com botões +/- e sufixo opcional.', category: 'Atoms' },
  // Feedback
  { slug: 'alert', name: 'Alert', description: 'Alerta inline com variantes semânticas.', category: 'Feedback' },
  { slug: 'toast', name: 'Toast', description: 'Notificações temporárias via hook.', category: 'Feedback' },
  { slug: 'modal', name: 'Modal', description: 'Dialog acessível com overlay.', category: 'Feedback' },
  { slug: 'tooltip', name: 'Tooltip', description: 'Dica de contexto ao hover/focus.', category: 'Feedback' },
  // Navegação
  { slug: 'sidebar', name: 'Sidebar', description: 'Navegação lateral colapsável.', category: 'Navegação' },
  { slug: 'bottom-nav', name: 'BottomNav', description: 'Navegação inferior para mobile.', category: 'Navegação' },
  { slug: 'nav-item', name: 'NavItem', description: 'Item de link de navegação.', category: 'Navegação' },
  { slug: 'tabs', name: 'Tabs', description: 'Componente acessível para alternância de painéis.', category: 'Navegação' },
  // Dados
  { slug: 'module-card', name: 'ModuleCard', description: 'Card de módulo do ecossistema Nexus.', category: 'Dados' },
  {
    slug: 'module-card-skeleton',
    name: 'ModuleCardSkeleton',
    description: 'Placeholder de carregamento alinhado ao ModuleCard; inclui grelha ModuleGridSkeleton.',
    category: 'Layout',
  },
  { slug: 'toggle-matrix', name: 'ToggleMatrix', description: 'Matriz de interruptores com cabeçalho fixo e scroll horizontal.', category: 'Dados' },
  { slug: 'data-table', name: 'DataTable', description: 'Tabela com loading, vazio e colunas configuráveis.', category: 'Dados' },
  { slug: 'line-chart-panel', name: 'LineChartPanel', description: 'Gráfico de linhas (Recharts) com períodos opcionais e séries configuráveis.', category: 'Dados' },
  { slug: 'circular-progress', name: 'CircularProgress', description: 'Progresso circular com percentual no centro.', category: 'Layout' },
  { slug: 'streak-badge', name: 'StreakBadge', description: 'Destaque de sequência (streak) com sufixo e ícone opcionais.', category: 'Atoms' },
  { slug: 'completion-toggle', name: 'CompletionToggle', description: 'Botão grande para marcar conclusão (sim/não).', category: 'Atoms' },
  { slug: 'checklist', name: 'Checklist', description: 'Lista de checkboxes com rótulos e pontos opcionais.', category: 'Atoms' },
  { slug: 'integer-slider', name: 'IntegerSlider', description: 'Valor inteiro com range e edição inline.', category: 'Atoms' },
  { slug: 'hold-stepper', name: 'HoldStepper', description: 'Contador com botões +/- e repetição ao manter pressionado.', category: 'Atoms' },
  { slug: 'calendar-heatmap', name: 'CalendarHeatmap', description: 'Calendário mensal com intensidade por célula (heatmap).', category: 'Dados' },
];

export const categories: ComponentCategory[] = ['Atoms', 'Layout', 'Feedback', 'Navegação', 'Dados'];

export function getByCategory(category: ComponentCategory): ComponentEntry[] {
  return componentsRegistry.filter((c) => c.category === category);
}

export function getBySlug(slug: string): ComponentEntry | undefined {
  return componentsRegistry.find((c) => c.slug === slug);
}
