import type { ReactNode, SVGProps } from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  /** Width and height in px. In buttons and toggles the kit CSS sizes the icon (16px), so leave it. */
  size?: number;
  /**
   * Kit icons: stroke 1.6 on a 24 grid, no fills (DESIGN.md §0.7).
   * Chevrons and check marks use 2 (DESIGN.md §1.8).
   */
  strokeWidth?: 1.6 | 2;
};

type IconBaseProps = IconProps & {
  /** The icon's shapes, drawn on a 24×24 grid */
  children: ReactNode;
};

/**
 * Base for every kit icon: 24 grid, no fill, stroke in currentColor, round caps and joins.
 *
 * Icons are decorative by default (`aria-hidden`). The accessible name belongs to the control
 * that holds the icon (`<Button iconOnly aria-label="Close">`). For a standalone meaningful
 * icon, pass `aria-label`: the icon then gets `role="img"`.
 */
export function Icon({ size = 24, strokeWidth = 1.6, children, ...props }: IconBaseProps) {
  const labelled = Boolean(props['aria-label'] || props['aria-labelledby']);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...(labelled ? { role: 'img' } : { 'aria-hidden': true })}
      {...props}
    >
      {children}
    </svg>
  );
}
