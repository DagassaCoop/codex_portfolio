import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import clsx from 'clsx';

type IconOnlyProps = { iconOnly: true; 'aria-label': string } | { iconOnly?: false };

export type ToggleProps = Omit<BaseToggle.Props, 'className'> &
  IconOnlyProps & {
    className?: string;
  };

/**
 * Kit toggle (DESIGN.md §3) on Base UI Toggle: a button that stays pressed.
 * Use it alone ("Live only" filter) or inside a `ToggleGroup` (give it a `value` there).
 * `iconOnly` is only for the type check: an icon toggle must have an `aria-label`.
 *
 * @example
 * <Toggle pressed={liveOnly} onPressedChange={setLiveOnly}>Live only</Toggle>
 * <Toggle iconOnly aria-label="Grid view"><LayoutGridIcon /></Toggle>
 */
export function Toggle({ iconOnly, className, ...props }: ToggleProps) {
  return <BaseToggle className={clsx('cx-toggle', className)} {...props} />;
}
