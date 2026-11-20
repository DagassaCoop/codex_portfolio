import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type ChipProps = Omit<BaseToggle.Props, 'className'> & {
  /** Small count after the label, e.g. "06" tavole in this category */
  count?: ReactNode;
  className?: string;
};

/**
 * Kit chip (DESIGN.md §6): a pill-shaped filter that stays pressed, on Base UI Toggle.
 * Used for the Work filter (All / Frontend / Fullstack / …). On = ink fill.
 *
 * @example
 * <Chip pressed={filter === 'all'} onPressedChange={() => setFilter('all')} count="06">All</Chip>
 */
export function Chip({ count, className, children, ...props }: ChipProps) {
  return (
    <BaseToggle className={clsx('cx-chip', className)} {...props}>
      {children}
      {count != null && <sup>{count}</sup>}
    </BaseToggle>
  );
}
