import React, { forwardRef } from 'react';
import { NEXUS_LOGO_SVG_INNER } from './logo-inner';

/** Conteúdo dentro de `<g>` (apenas `<path>`…), sem duplicar o grupo. */
const LOGO_PATHS_HTML = NEXUS_LOGO_SVG_INNER.replace(/^<g[^>]*>\s*/, '').replace(/\s*<\/g>\s*$/, '');

export interface NexusLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** Largura e altura iguais (número = px). */
  size?: number | string;
  /** Texto para leitores de ecrã; omitir para decorativo (`aria-hidden`). */
  title?: string;
}

/**
 * Logótipo Nexus: usa `currentColor`, por defeito alinhado ao token **brand primary** (`text-brand-primary`).
 * Preferível a `<img src="logo.svg">` quando quiseres cor dinâmica com o tema.
 */
export const NexusLogo = forwardRef<SVGSVGElement, NexusLogoProps>(
  ({ size = 32, className = '', title, ...props }, ref) => {
    const a11y = title
      ? { role: 'img' as const, 'aria-label': title }
      : { 'aria-hidden': true as const };

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        width={size}
        height={size}
        className={['text-brand-primary shrink-0', className].filter(Boolean).join(' ')}
        focusable="false"
        {...a11y}
        {...props}
      >
        <g fill="currentColor" dangerouslySetInnerHTML={{ __html: LOGO_PATHS_HTML }} />
      </svg>
    );
  },
);

NexusLogo.displayName = 'NexusLogo';
