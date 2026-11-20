import { Separator as BaseSeparator } from '@base-ui/react/separator';
import clsx from 'clsx';

export type SeparatorProps = Omit<BaseSeparator.Props, 'className'> & {
  /** line: 1px inside components · ink: 1px ink · strong: 2px ink (header, stamp, tables) */
  tone?: 'line' | 'ink' | 'strong';
  className?: string;
};

/**
 * Kit separator (DESIGN.md §8) on Base UI Separator. `orientation="vertical"` stretches to the
 * row's height (between nav items, for example).
 *
 * @example
 * <Separator />
 * <Separator tone="strong" />
 */
export function Separator({
  tone = 'line',
  orientation = 'horizontal',
  className,
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={clsx(
        'cx-sep',
        tone !== 'line' && `cx-sep--${tone}`,
        orientation === 'vertical' && 'cx-sep--v',
        className,
      )}
      {...props}
    />
  );
}
