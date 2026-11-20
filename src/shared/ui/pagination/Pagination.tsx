import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithRef, ReactNode } from 'react';

import { Link } from '@/shared/i18n';

type LinkHref = ComponentProps<typeof Link>['href'];

export type PaginationProps = Omit<ComponentPropsWithRef<'nav'>, 'aria-label'> & {
  /** Read by screen readers (translated): "Tavole" */
  'aria-label': string;
};

/**
 * Kit pagination between tavole (DESIGN.md §5): Roman numerals plus prev / next.
 * Children are `PaginationLink`s.
 *
 * @example
 * <Pagination aria-label="Tavole">
 *   <PaginationLink href="/work/b" wide>← Tav. II</PaginationLink>
 *   <PaginationLink href="/work/c" current>III</PaginationLink>
 *   <PaginationLink disabled>VI</PaginationLink>
 * </Pagination>
 */
export function Pagination({ className, ...props }: PaginationProps) {
  return <nav className={clsx('cx-pager', className)} {...props} />;
}

export type PaginationLinkProps = {
  /** Internal path (locale-aware). Not needed when `disabled`. */
  href?: LinkHref;
  children: ReactNode;
  /** The page being viewed: ink fill, aria-current="page" */
  current?: boolean;
  /** Prev / next link with a label: "← Tav. II" */
  wide?: boolean;
  /** Not available yet ("in progress"): hatched, rendered as text */
  disabled?: boolean;
  /** Screen-reader label when the text alone is unclear, e.g. "Tavola III" for "III" */
  'aria-label'?: string;
  className?: string;
};

/** One square (or a wide prev / next link) in a `Pagination` */
export function PaginationLink({
  href,
  children,
  current = false,
  wide = false,
  disabled = false,
  className,
  ...props
}: PaginationLinkProps) {
  const classes = clsx('cx-page', wide && 'cx-page--wide', className);

  if (disabled || href == null) {
    return (
      <span className={classes} aria-disabled="true" {...props}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={classes} aria-current={current ? 'page' : undefined} {...props}>
      {children}
    </Link>
  );
}
