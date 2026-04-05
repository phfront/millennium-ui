'use client';

import React, { createContext, useContext, useState, useId } from 'react';

// --- Context ---
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a <Tabs> provider');
  }
  return context;
}

// --- Tabs (Root) ---
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className = '' }: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const baseId = useId();

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange, baseId }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

// --- TabsList ---
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TabsList({ children, className = '', ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center justify-center p-1 rounded-lg bg-surface-2 border border-border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// --- TabsTrigger ---
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, children, className = '', disabled, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange, baseId } = useTabs();
  const isSelected = selectedValue === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-controls={panelId}
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onValueChange(value);
      }}
      className={[
        'inline-flex items-center justify-center whitespace-nowrap px-4 py-1.5 text-sm font-medium transition-all rounded-md select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1',
        isSelected
          ? 'bg-surface-1 text-text-primary shadow-sm ring-1 ring-inset ring-border-strong/10'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-3 border-transparent',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

// --- TabsContent ---
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, children, className = '', ...props }: TabsContentProps) {
  const { value: selectedValue, baseId } = useTabs();
  const isSelected = selectedValue === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isSelected) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!isSelected}
      className={`mt-4 ring-offset-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
