# [PROJETO] NEXUS UI: Design System do Ecossistema Nexus

## 1. VISÃO GERAL

O **Nexus UI** é a biblioteca de componentes e tokens de design compartilhada por todos os projetos do ecossistema Nexus (`nexus-portal`, e futuros módulos como `nexus-flow`, `nexus-cash`, etc.).

O objetivo é garantir **consistência visual e de experiência** em todos os módulos, reduzindo duplicação de código e permitindo que cada módulo foque na sua lógica de negócio ao invés de re-implementar primitivas de interface.

- **Nome do pacote npm:** `@nexus-ui`
- **Tipo:** Biblioteca de componentes React (Client/Server Components compatíveis com Next.js 15).
- **Distribuição:** Inicialmente via **path mapping local** (monorepo ou `npm link`). Futuramente publicável no npm ou em registry privado.

---

## 2. REQUISITOS DE INFRAESTRUTURA

- **Framework de componentes:** React 18+ com suporte a Server Components.
- **Estilização:** Tailwind CSS v4 — os tokens da lib são expostos como configuração Tailwind a ser herdada pelos consumidores.
- **Bundler:** [tsup](https://tsup.egoist.dev/) para gerar os bundles ESM e CJS.
- **Tipagem:** TypeScript (strict mode). Todos os componentes devem exportar seus tipos de props.
- **Ícones:** [Lucide React](https://lucide.dev/) como dependência peer — os componentes que usam ícones recebem o `icon_name` como string e resolvem dinamicamente.
- **Playground / Docs:** O projeto inclui uma aplicação de documentação visual interna chamada **Nexus UI Playground** (ver Seção 10). É a forma canônica de visualizar componentes, variações e exemplos de uso.
- **Testes:** Vitest + Testing Library para testes unitários de componentes críticos.
- **Peer dependencies:** `react`, `react-dom`, `tailwindcss`.

---

## 3. DESIGN TOKENS

Os tokens são a base do sistema. Devem ser definidos como variáveis CSS e mapeados no `tailwind.config.ts` exportado pela lib.

### 3.1 Paleta de Cores

O sistema é **dark-first**. Todas as cores devem ter variante para dark e light mode, controladas via classe `.dark` no `<html>`.

| Token | Propósito |
|---|---|
| `--color-brand-primary` | Cor de destaque principal (ex: violeta/índigo) |
| `--color-brand-secondary` | Cor de destaque secundária (ex: ciano/teal) |
| `--color-surface-1` | Fundo da aplicação (mais escuro/profundo) |
| `--color-surface-2` | Fundo de cards e painéis |
| `--color-surface-3` | Fundo de inputs e elementos interativos |
| `--color-border` | Cor de bordas e divisores |
| `--color-text-primary` | Texto principal |
| `--color-text-secondary` | Texto de suporte/legendas |
| `--color-text-muted` | Texto desabilitado/placeholder |
| `--color-success` | Feedback positivo |
| `--color-warning` | Feedback de alerta |
| `--color-danger` | Feedback de erro/destrutivo |
| `--color-info` | Feedback informativo |

### 3.2 Tipografia

- **Font Family:** `Inter` (Google Fonts) como padrão. Variável CSS: `--font-sans`.
- **Escala de tamanhos:** `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl` (alinhado ao Tailwind).
- **Font Weights:** `normal (400)`, `medium (500)`, `semibold (600)`, `bold (700)`.

### 3.3 Espaçamento e Layout

- Escala de espaçamento baseada em múltiplos de 4px (padrão Tailwind).
- **Border Radius:** `--radius-sm (4px)`, `--radius-md (8px)`, `--radius-lg (12px)`, `--radius-xl (16px)`, `--radius-full (9999px)`.

### 3.4 Sombras e Elevação

- `--shadow-sm`: sombra sutil para cards no nível 1.
- `--shadow-md`: sombra para modais e dropdowns.
- `--shadow-glow-brand`: brilho suave na cor `brand-primary` para efeitos de foco e hover.

### 3.5 Animações

- `--transition-fast: 150ms ease`.
- `--transition-base: 250ms ease`.
- `--transition-slow: 400ms ease`.
- Definir keyframes para: `fade-in`, `slide-up`, `pulse-glow`.

---

## 4. CATÁLOGO DE COMPONENTES

### 4.1 Primitivos (Atoms)

| Componente | Descrição |
|---|---|
| `<Button>` | Variantes: `primary`, `secondary`, `outline`, `ghost`, `danger`. Tamanhos: `sm`, `md`, `lg`, `icon`. Suporte a `isLoading` (spinner interno) e `leftIcon`/`rightIcon`. |
| `<Select>` | Menu dropdown personalizado com suporte a pesquisa (`searchable`) e múltipla escolha (`multiple`). |
| `<Input>` | Campo de texto com suporte a `label`, `helperText`, `errorMessage`, `leftIcon`, tipos `text`, `email`, `password` (com toggle de visibilidade). |
| `<Textarea>` | Área de texto com auto-resize opcional. |
| `<Badge>` | Variantes: `success`, `warning`, `danger`, `info`, `muted`. Tamanhos: `sm`, `md`. |
| `<Avatar>` | Exibe imagem de perfil. Fallback para iniciais do nome quando `src` é nulo. Tamanhos: `xs`, `sm`, `md`, `lg`, `xl`. |
| `<Icon>` | Wrapper sobre Lucide React. Recebe `name: string` e resolve o ícone dinamicamente. Suporte a `size` e `color`. |
| `<Spinner>` | Indicador de carregamento animado. Tamanhos: `sm`, `md`, `lg`. |
| `<Divider>` | Linha separadora horizontal ou vertical, com orientação e label central opcionais. |
| `<Switch>` | Toggle booleano acessível, com `label` e estado controlado. |

### 4.2 Layout (Molecules)

| Componente | Descrição |
|---|---|
| `<Card>` | Container com fundo `surface-2`, bordas, padding e sombra. Suporte a subcomponentes: `<Card.Header>`, `<Card.Body>`, `<Card.Footer>`. |
| `<PageHeader>` | Header de página com `title`, `subtitle` e slot para ações (`actions`). |
| `<EmptyState>` | Estado vazio com ícone, título e descrição. Slot para ação CTA. |
| `<Skeleton>` | Placeholder de carregamento. Variantes: `text`, `avatar`, `card`, `button`. Suporte a `count` para repetição. |

### 4.3 Feedback (Molecules)

| Componente | Descrição |
|---|---|
| `<Toast>` | Notificação temporária. Variantes: `success`, `error`, `warning`, `info`. Posição configurável. Sistema gerenciado por hook `useToast()`. |
| `<Alert>` | Mensagem de alerta inline (não temporária). Variantes: `success`, `error`, `warning`, `info`. |
| `<Modal>` | Dialog acessível com overlay, com subcomponentes: `<Modal.Header>`, `<Modal.Body>`, `<Modal.Footer>`. |
| `<Tooltip>` | Dica de contexto ao hover/focus. Posições: `top`, `bottom`, `left`, `right`. |

### 4.4 Navegação (Organisms)

| Componente | Descrição |
|---|---|
| `<Sidebar>` | Sidebar vertical com logo, lista de links de navegação e slot para rodapé. Suporte a modo colapsado (ícone-only). |
| `<BottomNav>` | Barra de navegação inferior para mobile. Recebe lista de items com `icon`, `label` e `href`. |
| `<NavItem>` | Item de link de navegação da Sidebar com ícone, label e indicador de ativo. |

### 4.5 Dados e Exibição (Organisms)

| Componente | Descrição |
|---|---|
| `<ModuleCard>` | Card específico do ecossistema Nexus. Exibe `icon`, `label`, `description` e `<Badge>` de status. Suporte a estado desabilitado (`Em breve`). |
| `<DataTable>` | Tabela genérica com suporte a colunas configuráveis, estado de loading (skeletons) e estado vazio. |

---

## 5. HOOKS UTILITÁRIOS

| Hook | Descrição |
|---|---|
| `useToast()` | Dispara e gerencia notificações toast (imperativo). Ex: `toast.success("Salvo!")`. |
| `useMediaQuery(query)` | Retorna boolean para media queries. Usado internamente pelo Shell para detectar mobile/desktop. |
| `useTheme()` | Lê e aplica o tema (`dark`/`light`) via classe no `<html>`. Integra com o estado Zustand do portal. |
| `useDisclosure()` | Gerencia estado `isOpen`/`onOpen`/`onClose` para modais, drawers e dropdowns. |

---

## 6. EXPORTAÇÕES E API PÚBLICA

O `index.ts` da lib deve exportar todos os componentes, hooks e tipos:

```ts
// Atoms
export { Button } from './components/button/button';
export { Select } from './components/select/select';
export { Input } from './components/input/input';
export { Badge } from './components/badge/badge';
export { Avatar } from './components/avatar';
export { Icon } from './components/icon';
export { Spinner } from './components/spinner';
export { Switch } from './components/switch';

// Layout
export { Card } from './components/card';
export { PageHeader } from './components/page-header';
export { EmptyState } from './components/empty-state';
export { Skeleton } from './components/skeleton';

// Feedback
export { Toast, ToastProvider } from './components/toast';
export { Alert } from './components/alert';
export { Modal } from './components/modal';
export { Tooltip } from './components/tooltip';

// Navigation
export { Sidebar } from './components/sidebar';
export { BottomNav } from './components/bottom-nav';
export { NavItem } from './components/nav-item';

// Domain
export { ModuleCard } from './components/module-card';

// Hooks
export { useToast } from './hooks/use-toast';
export { useMediaQuery } from './hooks/use-media-query';
export { useTheme } from './hooks/use-theme';
export { useDisclosure } from './hooks/use-disclosure';

// Config (para herança no tailwind.config.ts dos consumidores)
export { nexusUiPreset } from './tailwind-preset';
```

---

## 7. CONFIGURAÇÃO TAILWIND (PRESET EXPORTADO)

A biblioteca exporta um **preset Tailwind** que os projetos consumidores herdam:

```ts
// nexus-ui/src/tailwind-preset.ts
export const nexusUiPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
        },
        surface: {
          1: 'var(--color-surface-1)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)',
        },
        border: 'var(--color-border)',
        // ...demais tokens
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      // ...animações e sombras
    },
  },
};
```

**Como o consumidor usa:**
```ts
// nexus-portal/tailwind.config.ts
import { nexusUiPreset } from '@nexus-ui/tailwind-preset';
export default { presets: [nexusUiPreset], content: ['./src/**/*.{ts,tsx}'] };
```

---

## 8. ESTRUTURA DE PASTAS (REFERÊNCIA)

```
nexus-ui/
├── src/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.stories.tsx
│   │   │   └── index.ts
│   │   └── ... (um diretório por componente)
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   ├── use-theme.ts
│   │   ├── use-media-query.ts
│   │   └── use-disclosure.ts
│   ├── styles/
│   │   └── globals.css       # Variáveis CSS dos tokens (dark + light)
│   ├── tailwind-preset.ts    # Preset Tailwind exportado
│   └── index.ts              # Barrel de exportações públicas
├── .storybook/
│   └── main.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

---

## 9. INSTRUÇÕES TÉCNICAS PARA A IA

- Todo componente deve ser **acessível**: usar elementos semânticos corretos, atributos `aria-*` onde necessário e suporte a navegação por teclado.
- Os componentes devem usar `forwardRef` para permitir que os consumidores passem `ref`.
- Nenhum componente deve ter lógica de negócio do ecossistema Nexus — são **primitivos genéricos**.
- A exceção é o `<ModuleCard>`, que é um componente de domínio do ecossistema, mas não carrega dados — recebe tudo via props.
- Os estilos devem ser aplicados via classes Tailwind (nunca CSS inline), usando os tokens do preset exportado.
- O `<Icon>` deve importar ícones Lucide de forma lazy/dinâmica para não inflar o bundle dos consumidores com ícones não utilizados.
- O `<Toast>` deve ser gerenciado por um `<ToastProvider>` colocado no root layout do consumidor, e disparado pelo hook `useToast()` de qualquer lugar da árvore.
- Garantir que todos os componentes funcionem tanto em **Server Components** (sem estado/hooks) quanto em **Client Components** — marcar com `'use client'` apenas os que precisam.

---

## 10. NEXUS UI PLAYGROUND (DOCUMENTAÇÃO VISUAL)

### 10.1 Visão Geral

O **Nexus UI Playground** é uma aplicação Next.js embutida no próprio repositório `nexus-ui` (pasta `playground/`), acessível em `http://localhost:3100` durante o desenvolvimento.

Seu propósito é:
- Visualizar todos os componentes da biblioteca com suas variações.
- Servir como sandbox para testar props interativamente.
- Documentar exemplos de uso com código copiável.
- Validar visualmente tokens de design (cores, tipografia, espaçamento).

> **Não é Storybook.** É uma página própria, com o visual do ecossistema Nexus, usando os próprios tokens do `@nexus-ui`.

---

### 10.2 Layout do Playground

O playground possui um layout de duas colunas:

```
┌─────────────────────────────────────────────────────────┐
│  ⬡ Nexus UI                           🌙 Dark  /  ☀ Light │  ← Header fixo
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Sidebar     │   Área de Conteúdo                       │
│  (navegação  │   (componente selecionado + variações)   │
│   por        │                                          │
│   categoria) │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

**Header:**
- Logo "⬡ Nexus UI" à esquerda.
- Toggle de tema Dark/Light à direita — altera o tema globalmente no playground em tempo real.

**Sidebar (esquerda, fixa):**
- Lista de categorias agrupadas (Atoms, Layout, Feedback, Navegação, Dados).
- Cada categoria é expansível, exibindo os componentes filhos.
- Item ativo destacado com `brand-primary`.
- Campo de busca no topo para filtrar componentes por nome.

**Área de conteúdo (direita):**
- Exibe a página do componente selecionado.
- Scroll vertical independente.

---

### 10.3 Estrutura de Rotas do Playground

```
playground/
├── app/
│   ├── layout.tsx                   # Layout global (Header + Sidebar + conteúdo)
│   ├── page.tsx                     # Home: visão geral do design system (tokens)
│   ├── tokens/
│   │   └── page.tsx                 # Página de tokens: cores, tipografia, espaçamento
│   └── components/
│       ├── button/page.tsx
│       ├── input/page.tsx
│       ├── badge/page.tsx
│       ├── avatar/page.tsx
│       ├── icon/page.tsx
│       ├── spinner/page.tsx
│       ├── switch/page.tsx
│       ├── divider/page.tsx
│       ├── textarea/page.tsx
│       ├── card/page.tsx
│       ├── page-header/page.tsx
│       ├── empty-state/page.tsx
│       ├── skeleton/page.tsx
│       ├── toast/page.tsx
│       ├── alert/page.tsx
│       ├── modal/page.tsx
│       ├── tooltip/page.tsx
│       ├── sidebar/page.tsx
│       ├── bottom-nav/page.tsx
│       ├── module-card/page.tsx
│       └── data-table/page.tsx
```

---

### 10.4 Página de Tokens (`/tokens`)

Exibe todos os design tokens visuais do sistema em uma página de referência:

**Seção: Cores**
- Grid de swatches para cada token de cor (brand, surface, text, feedback).
- Cada swatch exibe: amostra visual, nome do token CSS (`--color-brand-primary`), valor em hex.
- Troca automaticamente os valores ao alternar Dark/Light mode.

**Seção: Tipografia**
- Escala de tamanhos renderizada com texto real ("Aa").
- Exibe font family, size, line-height e weight.

**Seção: Espaçamento**
- Régua visual com todas as escalas de espaçamento (4px, 8px, 12px...).

**Seção: Border Radius**
- Cards lado a lado mostrando cada raio (`sm`, `md`, `lg`, `xl`, `full`).

**Seção: Sombras**
- Cards flutuantes demonstrando `shadow-sm`, `shadow-md`, `shadow-glow-brand`.

**Seção: Animações**
- Botões que ao clicar demonstram `fade-in`, `slide-up`, `pulse-glow`.

---

### 10.5 Anatomia de uma Página de Componente

Cada página de componente (`/components/[nome]`) segue a mesma estrutura:

```
┌─────────────────────────────────────────────────────────┐
│  Button                                                  │  ← Título
│  Botão de ação primária do ecossistema. Suporta variantes│  ← Descrição
│  de estilo, tamanhos e estados.                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Variação 1: Variantes]                                │  ← Seção de variação
│  ┌──────────────────────────────────────────────────┐   │
│  │  [Primary] [Secondary] [Ghost] [Danger]          │   │  ← Preview ao vivo
│  └──────────────────────────────────────────────────┘   │
│  ```tsx                                                 │
│  <Button variant="primary">Salvar</Button>               │  ← Código copiável
│  <Button variant="ghost">Cancelar</Button>               │
│  ```                                                    │
│  [📋 Copiar]                                            │  ← Botão copiar
│                                                         │
│  [Variação 2: Tamanhos]                                 │
│  ...                                                    │
│                                                         │
│  [Variação 3: Estados]                                  │
│  ...                                                    │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Props                                           │   │  ← Tabela de props
│  │  variant  │ string  │ 'primary'  │ Estilo visual │   │
│  │  size     │ string  │ 'md'       │ Tamanho       │   │
│  │  isLoading│ boolean │ false      │ Estado loading│   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

Cada página de componente deve ter obrigatoriamente:
1. **Título e descrição** do componente.
2. **Seções de variação** — uma seção por grupo de props relevante.
3. **Preview ao vivo** — o componente real renderizado, não uma imagem.
4. **Bloco de código copiável** — trecho `tsx` mostrando como usar aquela variação.
5. **Tabela de Props** — listando todas as props com tipo, valor padrão e descrição.

---

### 10.6 Seções por Componente (Referência)

| Componente | Seções de variação |
|---|---|
| `Button` | Variantes (primary/secondary/ghost/danger), Tamanhos (sm/md/lg), Estados (loading, disabled), Com Ícone (esquerda/direita) |
| `Input` | Padrão, Com Label e HelperText, Com Erro, Com Ícone, Tipos (text/email/password com toggle) |
| `Textarea` | Padrão, Com Label, Com Erro, Auto-resize |
| `Badge` | Variantes (success/warning/danger/info/muted), Tamanhos (sm/md) |
| `Avatar` | Com imagem, Fallback de iniciais, Tamanhos (xs/sm/md/lg/xl) |
| `Icon` | Grid com todos os ícones Lucide disponíveis, filtráveis por nome |
| `Spinner` | Tamanhos (sm/md/lg), Cores |
| `Switch` | Ligado/Desligado, Com Label, Disabled |
| `Divider` | Horizontal, Vertical (inline), Com label central |
| `Card` | Simples, Com Header+Body+Footer, Variantes de elevação |
| `PageHeader` | Só título, Com subtitle, Com slot de ações |
| `EmptyState` | Padrão (sem dados), Com ação CTA, Variante de erro |
| `Skeleton` | Variantes (text/avatar/card/button), Com count (lista de skeletons) |
| `Alert` | Todas as variantes (success/error/warning/info/muted) |
| `Toast` | Demonstração interativa: botão que dispara cada tipo de toast |
| `Modal` | Trigger que abre modal com Header+Body+Footer. Tamanhos (sm/md/lg) |
| `Tooltip` | Posições (top/right/bottom/left), Conteúdo longo |
| `ModuleCard` | Ativo, Em breve (desabilitado), Grid de múltiplos cards |
| `DataTable` | Com dados, Estado vazio, Estado loading (skeletons) |

---

### 10.7 Home do Playground (`/`)

A página inicial do playground é uma **visão geral do sistema**:

- Banner com logo "⬡ Nexus UI" e subtítulo "Design System do Ecossistema Nexus".
- Cards de acesso rápido para cada categoria (Atoms, Layout, Feedback, Navegação, Dados, Tokens).
- Contador de componentes disponíveis (ex: "20 componentes · 4 hooks · 13 tokens").
- Seção "Início Rápido" com snippet de instalação/configuração:

```tsx
// 1. Configure o Tailwind
import { nexusUiPreset } from '@nexus-ui/tailwind-preset';
export default { presets: [nexusUiPreset] };

// 2. Use os componentes
import { Button, Card, Badge } from '@nexus-ui';
```

---

### 10.8 Estrutura de Pastas do Playground

```
playground/                    # App Next.js standalone de documentação
├── app/
│   ├── layout.tsx             # Shell: Header + Sidebar + conteúdo
│   ├── page.tsx               # Home do playground
│   ├── tokens/page.tsx        # Página de design tokens
│   └── components/
│       └── [slug]/page.tsx    # Página dinâmica por componente
├── components/
│   ├── playground-sidebar.tsx # Navegação lateral com busca
│   ├── playground-header.tsx  # Header com toggle de tema
│   ├── component-preview.tsx  # Container de preview ao vivo
│   ├── code-block.tsx         # Bloco de código com botão copiar
│   └── props-table.tsx        # Tabela de props do componente
├── data/
│   └── components-registry.ts # Registro central: nome, rota, categoria, descrição
├── package.json               # "@nexus-ui": "file:../" (aponta para a lib local)
└── next.config.ts
```

---

### 10.9 Instruções Técnicas para a IA (Playground)

- O playground é uma aplicação Next.js **separada** dentro do monorepo — roda na porta `3100` (`next dev -p 3100`).
- Importa diretamente da lib local via `"@nexus-ui": "file:../"` no `package.json` — sem necessidade de publicar.
- O toggle de tema do playground deve aplicar/remover a classe `.dark` no `<html>`, respeitando os tokens CSS da `@nexus-ui`.
- O `code-block.tsx` deve usar **highlight de sintaxe** (ex: `shiki` ou `prism-react-renderer`) para renderizar os exemplos de código com cores.
- O `components-registry.ts` é a **fonte de verdade** da sidebar — ao adicionar um novo componente na lib, basta registrá-lo aqui para aparecer na navegação.
- Os previews de componente devem estar sobre um fundo `surface-1` (escuro no dark mode) para representar fielmente como o componente aparece em produção.
- A página de `Icon` deve renderizar um grid pesquisável com **todos os ícones Lucide** disponíveis na lib, agrupados por categoria.
