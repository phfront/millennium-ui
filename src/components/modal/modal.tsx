'use client';

import React, { forwardRef, useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

// ── Sub-components ─────────────────────────────────────────────────────────

interface ModalSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalHeader = forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={['flex items-center justify-between px-6 py-4 border-b border-border', className].join(' ')}
      {...props}
    />
  ),
);
ModalHeader.displayName = 'Modal.Header';

const ModalBody = forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={['px-6 py-5 overflow-y-auto', className].join(' ')} {...props} />
  ),
);
ModalBody.displayName = 'Modal.Body';

const ModalFooter = forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={['flex items-center justify-end gap-2 px-6 py-4 border-t border-border', className].join(' ')}
      {...props}
    />
  ),
);
ModalFooter.displayName = 'Modal.Footer';

// ── Root ───────────────────────────────────────────────────────────────────

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

interface ModalComponent {
  (props: ModalProps): React.ReactElement | null;
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

function ModalRoot({ isOpen, onClose, title, size = 'md', children, className = '' }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    return () => prev?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? titleId : undefined}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={[
          'relative z-10 w-full rounded-xl bg-surface-2 shadow-md',
          'border border-border animate-slide-up',
          'focus:outline-none',
          sizeClasses[size],
          className,
        ].join(' ')}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 id={titleId} className="text-lg font-semibold text-text-primary">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar modal"
              className="text-text-muted hover:text-text-primary transition-colors rounded-md p-1 hover:bg-surface-3"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="px-6 py-5 overflow-y-auto max-h-[min(75vh,36rem)]">{children}</div>
      </div>
    </div>
  );
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
}) as ModalComponent;
