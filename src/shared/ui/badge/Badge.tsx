import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type BadgeTone =
  'default' | 'accent' | 'solid' | 'outline' | 'success' | 'warning' | 'error';

export type BadgeProps = ComponentPropsWithRef<'span'> & {
  /**
   * default: stack items · accent: domain (iGaming) · solid: selected · outline: stack with a tooltip ·
   * success: "Available for work" · warning: "Draft" · error: "Archived"
   */
  tone?: BadgeTone;
  /** A status dot before the text, in the badge's colour */
  dot?: boolean | 'pulse';
};

/**
 * Static kit badge (DESIGN.md §6). For a clickable filter, use `Chip`.
 *
 * @example
 * <Badge tone="accent">iGaming</Badge>
 * <Badge tone="success" dot="pulse">Available for work</Badge>
 */
export function Badge({
  tone = 'default',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx('cx-badge', tone !== 'default' && `cx-badge--${tone}`, className)}
      {...props}
    >
      {dot && (
        <span className={clsx('cx-dot', dot === 'pulse' && 'cx-dot--pulse')} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
