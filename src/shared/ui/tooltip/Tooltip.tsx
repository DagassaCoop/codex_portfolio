import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';

export type TooltipProps = {
  /** The element that shows the tooltip: a link or a button. It must already have an accessible name. */
  children: ReactElement;
  /** Tooltip text (translated). May contain a dark Kbd: <Kbd tone="dark">C</Kbd> */
  content: ReactNode;
  /**
   * `right`: next to the social rail. `top`: above stack badges.
   * The kit draws the arrow only for these two sides.
   */
  side?: 'right' | 'top';
  /** Open on first render (stories, docs) */
  defaultOpen?: boolean;
  className?: string;
};

/* Gaps between trigger and tooltip, as on kit sheet 05 §01 */
const sideOffset = { right: 10, top: 8 } as const;

/**
 * Kit tooltip (DESIGN.md §7) on Base UI Tooltip. Opens on hover and on keyboard focus after 300ms.
 * A tooltip repeats or adds a hint; it never replaces the trigger's accessible name.
 *
 * @example
 * <Tooltip content="GitHub ↗" side="right">
 *   <a href={github} aria-label="GitHub" className={buttonClassName({ variant: 'secondary', iconOnly: true })}>
 *     <GithubIcon />
 *   </a>
 * </Tooltip>
 */
export function Tooltip({ children, content, side = 'top', defaultOpen, className }: TooltipProps) {
  return (
    <BaseTooltip.Root defaultOpen={defaultOpen}>
      <BaseTooltip.Trigger delay={300} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          sideOffset={sideOffset[side]}
          // Never flip to the other side: the arrow is drawn for `right` and `top` only
          collisionAvoidance={{ side: 'shift' }}
        >
          <BaseTooltip.Popup className={clsx('cx-tip', `cx-tip--${side}`, className)}>
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
