import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithRef, ReactNode } from 'react';

import { Link } from '@/shared/i18n';

type LinkHref = ComponentProps<typeof Link>['href'];

export type ItemListProps = ComponentPropsWithRef<'div'>;

/** The framed list that holds `Item` rows (Work page, list mode) */
export function ItemList({ className, ...props }: ItemListProps) {
  return <div className={clsx('cx-items', className)} {...props} />;
}

export type ItemProps = {
  /** Internal path. Turns the row into a locale-aware link with the ↗ arrow. */
  href?: LinkHref;
  /** Roman tavola number in the square: "III" */
  num: ReactNode;
  title: ReactNode;
  /** Badges under the title */
  meta?: ReactNode;
  /** Right column, usually the year: "2025—" */
  end?: ReactNode;
  /** "In progress": muted, hatched number, no interaction. Ignored when `href` is set. */
  disabled?: boolean;
  className?: string;
};

/**
 * One project row in list mode (DESIGN.md §6): number · title + badges · year ↗.
 *
 * @example
 * <ItemList>
 *   <Item href="/work/innopharma-migration" num="III" title="AngularJS → Vue migration"
 *     meta={<Badge>Vue</Badge>} end="2023" />
 * </ItemList>
 */
export function Item({ href, num, title, meta, end, disabled, className }: ItemProps) {
  const content = (
    <>
      <span className="cx-item-num">{num}</span>
      <span>
        <span className="cx-item-title">{title}</span>
        {meta != null && <span className="cx-item-meta">{meta}</span>}
      </span>
      <span className="cx-item-end">
        {end}
        {href != null && (
          <small>
            <span className="cx-item-arrow" aria-hidden="true">
              ↗
            </span>
          </small>
        )}
      </span>
    </>
  );

  if (href != null) {
    return (
      <Link href={href} className={clsx('cx-item', className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={clsx('cx-item', className)} data-disabled={disabled || undefined}>
      {content}
    </div>
  );
}
