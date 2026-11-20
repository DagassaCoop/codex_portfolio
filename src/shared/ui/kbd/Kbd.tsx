import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type KbdProps = ComponentPropsWithRef<'kbd'> & {
  /** `dark` on ink surfaces: tooltips, dark panels */
  tone?: 'light' | 'dark';
};

/**
 * One keyboard key (DESIGN.md §3). For a shortcut, render one `<Kbd>` per key: ⌘ + K.
 *
 * @example
 * <Kbd>⌘</Kbd><Kbd>K</Kbd>
 */
export function Kbd({ tone = 'light', className, ...props }: KbdProps) {
  return (
    <kbd className={clsx('cx-kbd', tone === 'dark' && 'cx-kbd--dark', className)} {...props} />
  );
}
