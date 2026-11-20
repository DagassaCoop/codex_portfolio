import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithRef, ReactNode } from 'react';

import { Link } from '@/shared/i18n';

type LinkHref = ComponentProps<typeof Link>['href'];

export type CardProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  children: ReactNode;
  /**
   * Internal path, e.g. `/work/innopharma-migration`. Turns the whole card into a locale-aware
   * link (lifts on hover, the arrow leaves ↗). Without it the card is static.
   */
  href?: LinkHref;
  /**
   * "In progress": muted, dimmed media, no interaction. Ignored when `href` is set.
   * The dimmed media fails text contrast (kit opacity exception, DESIGN.md §9.8) and carries no
   * information here, so give its CardMedia `aria-hidden`; the title and a Draft badge say it all.
   */
  disabled?: boolean;
};

/**
 * The tavola (project) card (DESIGN.md §6). Compose it from the parts below:
 * CardMedia → CardBody (CardTitle + badges) → CardFoot (year + CardArrow).
 *
 * @example
 * <Card href="/work/innopharma-migration">
 *   <CardMedia tag="Tav. III" placeholder="[ SCREEN ]" />
 *   <CardBody>
 *     <CardTitle>AngularJS → Vue migration</CardTitle>
 *     <div className="cx-inline"><Badge>Vue</Badge></div>
 *   </CardBody>
 *   <CardFoot>2023<CardArrow /></CardFoot>
 * </Card>
 */
export function Card({ href, disabled, className, children, ...props }: CardProps) {
  if (href != null) {
    return (
      <Link href={href} className={clsx('cx-card', 'cx-card--link', className)}>
        {children}
      </Link>
    );
  }

  return (
    <div className={clsx('cx-card', className)} data-disabled={disabled || undefined} {...props}>
      {children}
    </div>
  );
}

export type CardMediaProps = ComponentPropsWithRef<'div'> & {
  /** Tavola number in the top-left corner: "Tav. I" */
  tag?: ReactNode;
  /** Label on the hatched placeholder while there is no image: "[ SCREEN ]". Decorative (aria-hidden). */
  placeholder?: ReactNode;
};

/** The 16:10 media area: an image (next/image with `fill`) or the hatched placeholder. */
export function CardMedia({ tag, placeholder, className, children, ...props }: CardMediaProps) {
  return (
    <div className={clsx('cx-card-media', className)} {...props}>
      {children}
      {tag != null && <span className="cx-card-tag">{tag}</span>}
      {placeholder != null && <span aria-hidden="true">{placeholder}</span>}
    </div>
  );
}

export type CardBodyProps = ComponentPropsWithRef<'div'>;

/** Title and badges, 10px apart */
export function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={clsx('cx-card-body', className)} {...props} />;
}

export type CardTitleProps = ComponentPropsWithRef<'h3'> & {
  /** Heading level for the page outline. Looks the same at every level (.cx-h4). */
  as?: 'h2' | 'h3' | 'h4';
};

/** The project title; underlined while a link card is hovered */
export function CardTitle({ as: Heading = 'h3', className, ...props }: CardTitleProps) {
  return <Heading className={clsx('cx-card-title', 'cx-h4', className)} {...props} />;
}

export type CardFootProps = ComponentPropsWithRef<'div'>;

/** Mono footer: year on the left, CardArrow (or "—") on the right */
export function CardFoot({ className, ...props }: CardFootProps) {
  return <div className={clsx('cx-card-foot', className)} {...props} />;
}

/** The ↗ that moves and turns sanguine on hover. Decorative. */
export function CardArrow({ className, ...props }: ComponentPropsWithRef<'span'>) {
  return (
    <span aria-hidden="true" className={clsx('cx-card-arrow', className)} {...props}>
      ↗
    </span>
  );
}
