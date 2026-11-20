import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type MarkerProps = Omit<ComponentPropsWithRef<'div'>, 'role'>;

/**
 * A labelled divider (DESIGN.md §8): ink lines on both sides of a mono label.
 * Wrap the section name in <b> to colour it sanguine. It is a separator for assistive tech,
 * so the section still needs its own heading.
 *
 * @example
 * <Marker>Fol. 03 · <b>About</b></Marker>
 */
export function Marker({ className, children, ...props }: MarkerProps) {
  return (
    <div role="separator" className={clsx('cx-marker', className)} {...props}>
      <span>{children}</span>
    </div>
  );
}
