import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import clsx from 'clsx';

export type ToggleGroupProps = Omit<BaseToggleGroup.Props, 'className'> & {
  /** What the choice is about, read by screen readers: "Language", "View" */
  'aria-label': string;
  className?: string;
};

/**
 * Kit toggle group (DESIGN.md §3) on Base UI ToggleGroup.
 * Children are `<Toggle value="…">`. One item is pressed at a time unless `multiple`.
 * Arrow keys move focus between items.
 *
 * The value is always an array of pressed item values, also for a single choice: `['en']`.
 *
 * @example
 * <ToggleGroup aria-label="Language" value={[locale]} onValueChange={([next]) => next && setLocale(next)}>
 *   <Toggle value="en">EN</Toggle>
 *   <Toggle value="fr">FR</Toggle>
 * </ToggleGroup>
 */
export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return <BaseToggleGroup className={clsx('cx-tgroup', className)} {...props} />;
}
