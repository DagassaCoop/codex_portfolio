import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type DimensionProps = Omit<ComponentPropsWithRef<'div'>, 'aria-hidden'>;

/**
 * A dimension line with end ticks and a real value (DESIGN.md §8). Part of the decorative
 * drawing layer: always hidden from assistive tech.
 *
 * @example
 * <Dimension>1280 PX</Dimension>
 */
export function Dimension({ className, children, ...props }: DimensionProps) {
  return (
    <div aria-hidden="true" className={clsx('cx-dim', className)} {...props}>
      <span>{children}</span>
    </div>
  );
}
