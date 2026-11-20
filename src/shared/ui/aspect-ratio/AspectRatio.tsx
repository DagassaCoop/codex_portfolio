import clsx from 'clsx';
import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';

export type AspectRatioProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** Width / height, e.g. 16 / 9. Kit ratios: 16:9, 4:5, 16:7 (dialog), 16:10 (card). */
  ratio: number;
  /** Corner label of the placeholder, e.g. "16 : 9" or "SCREEN 01" */
  label?: ReactNode;
  /** Usually an image with `fill` (next/image). Without children the frame shows the hatched placeholder. */
  children?: ReactNode;
};

/**
 * A frame of a fixed ratio (DESIGN.md §6): hatched placeholder until an image fills it.
 *
 * @example
 * <AspectRatio ratio={16 / 9} label="Screen 01">
 *   <Image src={shot} alt="…" fill sizes="(min-width: 1024px) 50vw, 100vw" />
 * </AspectRatio>
 */
export function AspectRatio({
  ratio,
  label,
  children,
  className,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      className={clsx('cx-ratio', className)}
      style={{ aspectRatio: ratio, ...style } as CSSProperties}
      {...props}
    >
      {children}
      {label != null && <span>{label}</span>}
    </div>
  );
}
