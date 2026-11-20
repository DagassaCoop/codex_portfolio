import { Fragment, type ComponentProps, type ReactNode } from 'react';

import { Link } from '@/shared/i18n';

type LinkHref = ComponentProps<typeof Link>['href'];

export type BreadcrumbItem = {
  label: ReactNode;
  /** Internal path. Leave it out on the last item: that is the current page. */
  href?: LinkHref;
};

export type BreadcrumbProps = {
  /** Read by screen readers (translated): "Breadcrumb" */
  'aria-label': string;
  /** From the root to the current page. The last item is marked as the current page. */
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Kit breadcrumb (DESIGN.md §5): "Codex / Fol. 02 / Tav. III", locale-aware links.
 *
 * @example
 * <Breadcrumb aria-label="Breadcrumb" items={[
 *   { label: 'Codex', href: '/' },
 *   { label: 'Fol. 02', href: '/work' },
 *   { label: 'Tav. III' },
 * ]} />
 */
export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav className={className} {...props}>
      <ol className="cx-crumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={index}>
              {index > 0 && (
                <li className="cx-crumb-sep" aria-hidden="true">
                  /
                </li>
              )}
              <li>
                {isLast || item.href == null ? (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
