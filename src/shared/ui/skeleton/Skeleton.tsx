import clsx from 'clsx';
import type { ComponentPropsWithRef, CSSProperties } from 'react';

export type SkeletonProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** CSS width: a number is px, a string is used as is ("70%") */
  width?: number | string;
  /** CSS height: a number is px */
  height?: number | string;
};

/**
 * A loading placeholder (DESIGN.md §6): sliding hatching. Hidden from assistive tech;
 * give the container that is loading `role="status"`, `aria-busy="true"` and an `aria-label`.
 *
 * @example
 * <div role="status" aria-busy="true" aria-label="Loading tavola">
 *   <Skeleton height={16} width="70%" />
 * </div>
 */
export function Skeleton({ width, height, className, style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx('cx-skel', className)}
      style={{ width, height, ...style } as CSSProperties}
      {...props}
    />
  );
}
