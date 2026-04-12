'use client';

import React, { createContext, useContext, useState, useId, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

// --- Types ---

interface AccordionContextValue {
  expandedValues: string[];
  toggleValue: (value: string) => void;
  baseId: string;
}

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  toggle: () => void;
  triggerId: string;
  contentId: string;
}

// --- Context ---

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within <Accordion>');
  }
  return context;
}

function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItem components must be used within <Accordion.Item>');
  }
  return context;
}

// --- Root ---

export interface AccordionProps {
  children: ReactNode;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: 'single' | 'multiple';
  className?: string;
}

export function Accordion({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  type = 'single',
  className = '',
}: AccordionProps) {
  const baseId = useId();
  const isSingle = type === 'single';

  const normalizeValue = (val: string | string[] | undefined): string[] => {
    if (val === undefined) return [];
    return Array.isArray(val) ? val : [val];
  };

  const [uncontrolledValues, setUncontrolledValues] = useState<string[]>(() =>
    normalizeValue(defaultValue)
  );

  const isControlled = controlledValue !== undefined;
  const expandedValues = isControlled ? normalizeValue(controlledValue) : uncontrolledValues;

  const toggleValue = (value: string) => {
    let newValues: string[];

    if (isSingle) {
      newValues = expandedValues.includes(value) ? [] : [value];
    } else {
      newValues = expandedValues.includes(value)
        ? expandedValues.filter((v) => v !== value)
        : [...expandedValues, value];
    }

    if (!isControlled) {
      setUncontrolledValues(newValues);
    }

    onValueChange?.(isSingle ? newValues[0] || '' : newValues);
  };

  return (
    <AccordionContext.Provider value={{ expandedValues, toggleValue, baseId }}>
      <div className={`w-full ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

// --- Item ---

export interface AccordionItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ children, value, className = '' }: AccordionItemProps) {
  const { expandedValues, toggleValue, baseId } = useAccordion();
  const isExpanded = expandedValues.includes(value);
  const triggerId = `${baseId}-trigger-${value}`;
  const contentId = `${baseId}-content-${value}`;

  return (
    <AccordionItemContext.Provider
      value={{ value, isExpanded, toggle: () => toggleValue(value), triggerId, contentId }}
    >
      <div
        className={[
          'border border-border rounded-lg bg-surface-2 overflow-hidden',
          'transition-all duration-200',
          isExpanded ? 'shadow-sm' : '',
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// --- Trigger ---

export interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className = '' }: AccordionTriggerProps) {
  const { isExpanded, toggle, triggerId, contentId } = useAccordionItem();

  return (
    <button
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isExpanded}
      onClick={toggle}
      className={[
        'w-full flex items-center justify-between gap-3 px-4 py-3',
        'bg-surface-2 hover:bg-surface-3 transition-all duration-200 ease-out',
        'text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50',
        className,
      ].join(' ')}
    >
      <div className="flex-1 min-w-0">{children}</div>
      <ChevronDown
        className={[
          'w-5 h-5 text-text-muted shrink-0 transition-transform duration-300 ease-out',
          isExpanded ? 'rotate-180' : 'rotate-0',
        ].join(' ')}
      />
    </button>
  );
}

// --- Content ---

export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ children, className = '' }: AccordionContentProps) {
  const { isExpanded, triggerId, contentId } = useAccordionItem();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={[
        'grid transition-[grid-template-rows] duration-300 ease-out',
        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        className,
      ].join(' ')}
    >
      <div className="overflow-hidden">
        <div className={[
          'px-4 py-3 border-t border-border',
          'transition-opacity duration-200 ease-out',
          isExpanded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}>
          {children}
        </div>
      </div>
    </div>
  );
}

// --- Compound Component Assignment ---

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// --- Exports ---

export type { AccordionContextValue, AccordionItemContextValue };
