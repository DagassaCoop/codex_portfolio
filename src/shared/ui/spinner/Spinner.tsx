import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

type SpinnerA11yProps =
  /** Standalone: announced as a status. Pass translated text, e.g. t('loading'). */
  | { label: string; decorative?: false }
  /** Inside something that already says it is busy (a loading button): hidden from screen readers. */
  | { decorative: true; label?: never };

export type SpinnerProps = Omit<ComponentPropsWithRef<'span'>, 'children' | 'role'> &
  SpinnerA11yProps & {
    /** `md` = 20px, `lg` = 36px */
    size?: 'md' | 'lg';
  };

/**
 * The kit's "compass" spinner (DESIGN.md §4). Takes its colour from the parent.
 *
 * @example
 * <Spinner label="Sending" />
 * <span style={{ color: 'var(--sanguine)' }}><Spinner size="lg" label="Loading" /></span>
 */
export function Spinner({ size = 'md', label, decorative, className, ...props }: SpinnerProps) {
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'status', 'aria-label': label };

  return (
    <span
      className={clsx('cx-spinner', size === 'lg' && 'cx-spinner--lg', className)}
      {...a11y}
      {...props}
    />
  );
}
