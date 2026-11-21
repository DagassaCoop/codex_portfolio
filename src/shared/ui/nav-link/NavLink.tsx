'use client';

import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithRef, ReactNode } from 'react';

import { isCurrentPath, Link, usePathname } from '@/shared/i18n';

type LinkHref = ComponentProps<typeof Link>['href'];

export type NavBarProps = Omit<ComponentPropsWithRef<'nav'>, 'aria-label'> & {
  /** What the navigation is, read by screen readers (translated): "Primary" */
  'aria-label': string;
};

/** The row of `NavLink`s in the header (DESIGN.md §5) */
export function NavBar({ className, ...props }: NavBarProps) {
  return <nav className={clsx('cx-navbar', className)} {...props} />;
}

export type NavLinkProps = {
  /** Internal path without the locale: "/work". The link is locale-aware. */
  href: LinkHref & string;
  children: ReactNode;
  /** Small sanguine count after the label: "06" */
  count?: ReactNode;
  /**
   * Marks this link as the current page. By default it is worked out from the URL:
   * the same path or a page inside it ("/work" is current on "/work/some-case"); "/" only on "/".
   */
  current?: boolean;
  /** Not reachable yet ("soon"): rendered as text, not a link */
  disabled?: boolean;
  className?: string;
};

/**
 * Header navigation link (DESIGN.md §5): mono uppercase, sanguine bar under the current page.
 *
 * @example
 * <NavBar aria-label="Primary">
 *   <NavLink href="/work" count="06">Work</NavLink>
 *   <NavLink href="/about">About</NavLink>
 * </NavBar>
 */
export function NavLink({ href, children, count, current, disabled, className }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = current ?? isCurrentPath(pathname, href);

  const content = (
    <>
      {children}
      {count != null && <sup>{count}</sup>}
    </>
  );

  if (disabled) {
    return (
      <span className={clsx('cx-nav-link', className)} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={clsx('cx-nav-link', className)}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {content}
    </Link>
  );
}
