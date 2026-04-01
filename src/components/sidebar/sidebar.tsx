'use client';

import React, { forwardRef } from 'react';
import { NavItem } from '../nav-item/nav-item';
import { PanelLeftClose, PanelLeft } from 'lucide-react';

export interface SidebarNavLink {
  icon?: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: SidebarNavLink[];
  footer?: React.ReactNode;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    { logo, links = [], footer, isCollapsed = false, onToggleCollapse, className = '', ...props },
    ref,
  ) => (
    <nav
      ref={ref}
      aria-label="Navegação principal"
      className={[
        'flex flex-col bg-surface-2 border-r border-border h-full',
        'transition-[width] duration-[var(--transition-base)]',
        isCollapsed ? 'w-16' : 'w-60',
        className,
      ].join(' ')}
      {...props}
    >
      {/* Logo area */}
      <div className={['flex items-center h-16 px-4 border-b border-border shrink-0', isCollapsed ? 'justify-center' : 'gap-3'].join(' ')}>
        {logo && <span className="shrink-0">{logo}</span>}
        {!isCollapsed && (
          <span className="font-bold text-text-primary truncate flex-1 text-sm">Nexus</span>
        )}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
            className="ml-auto text-text-muted hover:text-text-primary transition-colors rounded-md p-1 hover:bg-surface-3"
          >
            {isCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>
        )}
      </div>

      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto px-2 py-3 flex flex-col gap-1">
        {links.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={link.isActive}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      {/* Footer slot */}
      {footer && (
        <div className={['shrink-0 border-t border-border px-2 py-3', isCollapsed ? 'flex justify-center' : ''].join(' ')}>
          {footer}
        </div>
      )}
    </nav>
  ),
);

Sidebar.displayName = 'Sidebar';
