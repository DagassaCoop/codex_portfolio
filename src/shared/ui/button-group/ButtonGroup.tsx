import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type ButtonGroupProps = Omit<ComponentPropsWithRef<'div'>, 'role'> & {
  /** What the group is for, read by screen readers: "Case actions", "Social links" */
  'aria-label': string;
  /** `vertical` is used for the social rail */
  orientation?: 'horizontal' | 'vertical';
};

/**
 * A row (or column) of kit buttons that share borders (DESIGN.md §3).
 * Children are `<Button>`s or links styled with `buttonClassName`.
 * Mark the selected segment with `aria-pressed` or `aria-current` on that child.
 *
 * @example
 * <ButtonGroup aria-label="Case actions">
 *   <Button variant="secondary">Live</Button>
 *   <Button variant="secondary">Code</Button>
 * </ButtonGroup>
 */
export function ButtonGroup({ orientation = 'horizontal', className, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={clsx('cx-btngroup', orientation === 'vertical' && 'cx-btngroup--v', className)}
      {...props}
    />
  );
}
