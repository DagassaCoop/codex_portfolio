import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithRef, ReactNode } from 'react';

import { Link } from '@/shared/i18n';

type LinkHref = ComponentProps<typeof Link>['href'];

export type CardLayout = 'vertical' | 'adaptive';

/**
 * When an `adaptive` card lies sideways (the media query in card.css). Pass it to parts that
 * should change with the layout, e.g. `<BadgeList collapse={CARD_ROW_QUERY}>`.
 */
export const CARD_ROW_QUERY = '(width > 600px) and (width <= 1024px)';

export type CardLink = 'card' | 'title';

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
  /**
   * - `vertical` (default): media above, body and foot below, at every width.
   * - `adaptive`: lies sideways on tablets (601–1024px), media on the left (42%), body and foot
   *   on the right; vertical on desktops and phones (Home design, Selected work).
   */
  layout?: CardLayout;
  /**
   * Where the card's link lives:
   * - `card` (default): with `href`, the whole card is the `<a>`.
   * - `title`: the link is `CardTitle`'s (give it `href`) and stretches over the whole card, which
   *   looks and behaves as a link card. Use it when the card holds its own buttons (a link cannot
   *   contain them): they sit above the stretched link. The link's name is then the title alone.
   */
  link?: CardLink;
};

/**
 * The tavola (project) card (DESIGN.md §6). Compose it from the parts below:
 * CardMedia → CardBody (CardTitle + badges) → CardFoot (year + CardArrow).
 *
 * @example
 * <Card href="/work/innopharma-migration">
 *   <CardMedia tag="TAV. III" placeholder="[ SCREEN ]" />
 *   <CardBody>
 *     <CardTitle>AngularJS → Vue migration</CardTitle>
 *     <div className="cx-inline"><Badge>Vue</Badge></div>
 *   </CardBody>
 *   <CardFoot>2023<CardArrow /></CardFoot>
 * </Card>
 */
export function Card({
  href,
  disabled,
  layout = 'vertical',
  link = 'card',
  className,
  children,
  ...props
}: CardProps) {
  const look = clsx('cx-card', layout === 'adaptive' && 'cx-card--adaptive');

  if (link === 'title') {
    return (
      <div className={clsx(look, 'cx-card--link', 'cx-card--title-link', className)} {...props}>
        {children}
      </div>
    );
  }

  if (href != null) {
    return (
      <Link href={href} className={clsx(look, 'cx-card--link', className)}>
        {children}
      </Link>
    );
  }

  return (
    <div className={clsx(look, className)} data-disabled={disabled || undefined} {...props}>
      {children}
    </div>
  );
}

export type CardMediaProps = ComponentPropsWithRef<'div'> & {
  /** Tavola number in the top-left corner: "TAV. I" */
  tag?: ReactNode;
  /** Caption in the bottom-left corner, over the image: the project's domain, "IGAMING" */
  caption?: ReactNode;
  /** Label on the hatched placeholder while there is no image: "[ SCREEN ]". Decorative (aria-hidden). */
  placeholder?: ReactNode;
};

/**
 * The 16:10 media area: an image (next/image with `fill`, or any element covering it) or the
 * hatched placeholder. The tag and the caption sit on top, on surface.
 */
export function CardMedia({
  tag,
  caption,
  placeholder,
  className,
  children,
  ...props
}: CardMediaProps) {
  return (
    <div className={clsx('cx-card-media', className)} {...props}>
      {children}
      {tag != null && <span className="cx-card-tag">{tag}</span>}
      {caption != null && <span className="cx-card-caption">{caption}</span>}
      {placeholder != null && <span aria-hidden="true">{placeholder}</span>}
    </div>
  );
}

export type CardBodyProps = ComponentPropsWithRef<'div'>;

/** Title and badges, 12px apart */
export function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={clsx('cx-card-body', className)} {...props} />;
}

export type CardTitleProps = ComponentPropsWithRef<'h3'> & {
  /** Heading level for the page outline. Looks the same at every level (.cx-h3). */
  as?: 'h2' | 'h3' | 'h4';
  /** The card's link, for `<Card link="title">`: stretches over the whole card */
  href?: LinkHref;
};

/** The project title; underlined while a link card is hovered */
export function CardTitle({
  as: Heading = 'h3',
  href,
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <Heading className={clsx('cx-card-title', 'cx-h3', className)} {...props}>
      {href != null ? <Link href={href}>{children}</Link> : children}
    </Heading>
  );
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
