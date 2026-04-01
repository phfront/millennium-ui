'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

type ToastStore = {
  toasts: ToastItem[];
  add: (toast: Omit<ToastItem, 'id'>) => void;
  remove: (id: string) => void;
};

// Simple global store without external deps
let listeners: Array<(toasts: ToastItem[]) => void> = [];
let toasts: ToastItem[] = [];

function notify() {
  listeners.forEach((fn) => fn([...toasts]));
}

function addToast(toast: Omit<ToastItem, 'id'>): string {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { ...toast, id }];
  notify();
  return id;
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export function useToast() {
  const [items, setItems] = useState<ToastItem[]>(toasts);

  useEffect(() => {
    listeners.push(setItems);
    return () => {
      listeners = listeners.filter((l) => l !== setItems);
    };
  }, []);

  const toast = {
    success: (title: string, description?: string, duration = 4000) =>
      addToast({ variant: 'success', title, description, duration }),
    error: (title: string, description?: string, duration = 6000) =>
      addToast({ variant: 'error', title, description, duration }),
    warning: (title: string, description?: string, duration = 5000) =>
      addToast({ variant: 'warning', title, description, duration }),
    info: (title: string, description?: string, duration = 4000) =>
      addToast({ variant: 'info', title, description, duration }),
    dismiss: (id: string) => removeToast(id),
  };

  return { toasts: items, toast };
}
