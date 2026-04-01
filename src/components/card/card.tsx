import React, { forwardRef } from 'react';

// ── Sub-components ─────────────────────────────────────────────────────────

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={['flex items-center justify-between px-5 py-4 border-b border-border', className].join(' ')}
      {...props}
    />
  ),
);
CardHeader.displayName = 'Card.Header';

const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={['px-5 py-4', className].join(' ')} {...props} />
  ),
);
CardBody.displayName = 'Card.Body';

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={['flex items-center gap-2 px-5 py-4 border-t border-border', className].join(' ')}
      {...props}
    />
  ),
);
CardFooter.displayName = 'Card.Footer';

// ── Root ───────────────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'rounded-lg bg-surface-2 border border-border shadow-sm',
        'transition-shadow duration-[var(--transition-fast)]',
        className,
      ].join(' ')}
      {...props}
    />
  ),
);
CardRoot.displayName = 'Card';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
}) as CardComponent;
