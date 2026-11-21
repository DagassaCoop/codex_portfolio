'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react';

import { isCurrentPath, Link, usePathname } from '@/shared/i18n';
import { DialogClose } from '@/shared/ui/dialog';
import { XIcon } from '@/shared/ui/icons';

import styles from './Sheet.module.css';

export type SheetPopupProps = Omit<BaseDialog.Popup.Props, 'className' | 'aria-label'> & {
  /** What the panel is, read by screen readers (translated): "Menu" */
  'aria-label': string;
  /** The edge it slides from. The mobile menu uses `right`. */
  side?: 'right' | 'left';
  className?: string;
};

/**
 * Kit sheet (DESIGN.md §7): a full-height panel from the screen edge over an ink scrim, for the mobile menu.
 * Open it with `Dialog` + `DialogTrigger` from `@/shared/ui/dialog`; Esc and a click on the scrim close it,
 * focus returns to the trigger.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger iconOnly aria-label="Open menu"><MenuIcon /></DialogTrigger>
 *   <SheetPopup aria-label="Menu">
 *     <SheetHeader label="Codex · Index" closeLabel="Close menu" />
 *     <SheetNav aria-label="Primary">
 *       <SheetNavLink href="/work" meta="FOL. 02">Work</SheetNavLink>
 *     </SheetNav>
 *     <SheetFooter>…</SheetFooter>
 *   </SheetPopup>
 * </Dialog>
 */
export function SheetPopup({ side = 'right', className, ...props }: SheetPopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={clsx('cx-scrim', styles.backdrop)} />
      <BaseDialog.Popup
        className={clsx(
          'cx-sheet-panel',
          side === 'left' && 'cx-sheet-panel--left',
          styles.panel,
          className,
        )}
        {...props}
      />
    </BaseDialog.Portal>
  );
}

export type SheetHeaderProps = {
  /** Small label on the left: "Codex · Index" */
  label: ReactNode;
  /** Accessible name of the close button (translated): "Close menu" */
  closeLabel: string;
};

/** 64px head: label and the Ghost close button */
export function SheetHeader({ label, closeLabel }: SheetHeaderProps) {
  return (
    <div className="cx-sheet-panel-head">
      <span className={clsx('cx-label', styles.label)}>{label}</span>
      <DialogClose iconOnly aria-label={closeLabel}>
        <XIcon />
      </DialogClose>
    </div>
  );
}

export type SheetNavProps = Omit<ComponentPropsWithRef<'nav'>, 'aria-label'> & {
  /** What the navigation is, read by screen readers (translated): "Primary" */
  'aria-label': string;
};

/** The list of sections: big titles with folio numbers */
export function SheetNav({ className, ...props }: SheetNavProps) {
  return <nav className={clsx('cx-sheet-nav', className)} {...props} />;
}

type LinkHref = ComponentProps<typeof Link>['href'];

export type SheetNavLinkProps = {
  /** Internal path without the locale: "/work". The link is locale-aware. */
  href: LinkHref & string;
  /** The section's title */
  children: ReactNode;
  /** Folio number on the right: "FOL. 02". Decorative, hidden from screen readers. */
  meta?: ReactNode;
  /** Marks this link as the current page; by default worked out from the URL, as in `NavLink` */
  current?: boolean;
  /** E.g. close the menu after choosing a section */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/** A section link; the current section's title is sanguine */
export function SheetNavLink({ href, children, meta, current, onClick }: SheetNavLinkProps) {
  const pathname = usePathname();
  const isCurrent = current ?? isCurrentPath(pathname, href);

  return (
    <Link href={href} aria-current={isCurrent ? 'page' : undefined} onClick={onClick}>
      <b>{children}</b>
      {meta != null && <span aria-hidden="true">{meta}</span>}
    </Link>
  );
}

/** The bottom area: a column pushed to the bottom of the panel (language switch, actions) */
export function SheetFooter({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div className={clsx(styles.footer, className)} {...props} />;
}
