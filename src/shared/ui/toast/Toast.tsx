'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import type { ReactNode } from 'react';

import { buttonClassName } from '@/shared/ui/button';
import { CheckIcon, XIcon } from '@/shared/ui/icons';
import { Spinner } from '@/shared/ui/spinner';

import styles from './Toast.module.css';

/** success: verdigris check · loading: spinner, stays until closed · accent: sanguine label · default */
export type ToastType = 'default' | 'success' | 'loading' | 'accent';

export type ToastOptions = {
  type?: ToastType;
  /** Short mono label (translated): "Copied", "Sending", "Draft saved" */
  title: string;
  /** The message (translated): "hello@…", "Your message is kept locally." */
  description: ReactNode;
  /** Optional action button: "Undo" */
  action?: { label: string; onClick: () => void };
  /** Milliseconds before it closes. Default 4000; `loading` toasts stay until closed or updated. */
  timeout?: number;
};

const DEFAULT_TIMEOUT = 4000;

export type ToastProviderProps = {
  children: ReactNode;
  /** Accessible name of every toast's dismiss button (translated): "Dismiss" */
  dismissLabel: string;
};

/**
 * Hosts the kit's toasts (DESIGN.md §7): place it once, around the app (src/app providers).
 * Toasts stack bottom right and close after 4s. Show one with `useToast()`.
 */
export function ToastProvider({ children, dismissLabel }: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={DEFAULT_TIMEOUT}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className={styles.viewport}>
          <ToastList dismissLabel={dismissLabel} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToastList({ dismissLabel }: { dismissLabel: string }) {
  const { toasts } = BaseToast.useToastManager();

  return toasts.map((toast) => (
    <BaseToast.Root key={toast.id} toast={toast} className="cx-toast">
      {toast.type === 'success' && <CheckIcon strokeWidth={2} />}
      {toast.type === 'loading' && <Spinner decorative />}
      <div className="cx-toast-body">
        <BaseToast.Title className="cx-label" render={<span />} />
        <BaseToast.Description render={<span />} />
      </div>
      {toast.actionProps && (
        <BaseToast.Action className={buttonClassName({ variant: 'secondary', size: 'sm' })} />
      )}
      <BaseToast.Close
        aria-label={dismissLabel}
        className={buttonClassName({ variant: 'ghost', size: 'sm', iconOnly: true })}
      >
        <XIcon />
      </BaseToast.Close>
    </BaseToast.Root>
  ));
}

/**
 * Shows and closes kit toasts. Needs `ToastProvider` above.
 *
 * @example
 * const toast = useToast();
 * toast.show({ type: 'success', title: t('copied'), description: email });
 */
export function useToast() {
  const manager = BaseToast.useToastManager();

  return {
    /** Shows a toast and returns its id */
    show: ({ type = 'default', title, description, action, timeout }: ToastOptions) =>
      manager.add({
        type,
        title,
        description,
        timeout: timeout ?? (type === 'loading' ? 0 : DEFAULT_TIMEOUT),
        actionProps: action && { children: action.label, onClick: action.onClick },
      }),
    /** Replaces a toast's content, e.g. "Sending" → "Message sent" */
    update: (id: string, options: ToastOptions) =>
      manager.update(id, {
        type: options.type ?? 'default',
        title: options.title,
        description: options.description,
        timeout: options.timeout ?? DEFAULT_TIMEOUT,
      }),
    close: (id: string) => manager.close(id),
  };
}
