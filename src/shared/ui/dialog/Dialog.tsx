import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { buttonClassName, type ButtonSize, type ButtonVariant } from '@/shared/ui/button';
import { XIcon } from '@/shared/ui/icons';

import styles from './Dialog.module.css';

/**
 * Kit dialog (DESIGN.md §7) on Base UI Dialog: a modal over an ink scrim.
 * Esc and a click on the scrim close it; focus moves inside and returns to the trigger.
 *
 * `Dialog` and `DialogTrigger` also open a `SheetPopup` (`@/shared/ui/sheet`).
 *
 * @example
 * <Dialog>
 *   <DialogTrigger variant="secondary">Preview</DialogTrigger>
 *   <DialogPopup>
 *     <DialogHeader label="Fol. 02 · Tav. I" title="Multi-brand platform" closeLabel="Close" />
 *     <DialogBody>
 *       <DialogDescription className="cx-small">Shared logic and a UI Kit in one monorepo.</DialogDescription>
 *     </DialogBody>
 *     <DialogFooter>
 *       <DialogClose>Close</DialogClose>
 *       <Link href="/work/soft2bet" className={buttonClassName({ variant: 'primary' })}>Open full case →</Link>
 *     </DialogFooter>
 *   </DialogPopup>
 * </Dialog>
 */
export function Dialog(props: BaseDialog.Root.Props) {
  return <BaseDialog.Root {...props} />;
}

type ButtonLook = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type IconOnlyProps = { iconOnly: true; 'aria-label': string } | { iconOnly?: false };

export type DialogTriggerProps = Omit<BaseDialog.Trigger.Props, 'className'> &
  ButtonLook &
  IconOnlyProps & {
    className?: string;
  };

/** The button that opens the dialog; looks like a kit button (Secondary by default) */
export function DialogTrigger({
  variant = 'secondary',
  size,
  iconOnly,
  className,
  ...props
}: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger
      className={clsx(buttonClassName({ variant, size, iconOnly }), className)}
      {...props}
    />
  );
}

export type DialogCloseProps = Omit<BaseDialog.Close.Props, 'className'> &
  ButtonLook &
  IconOnlyProps & {
    className?: string;
  };

/** A button that closes the dialog; Ghost by default ("Close", "Stay") */
export function DialogClose({
  variant = 'ghost',
  size,
  iconOnly,
  className,
  ...props
}: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={clsx(buttonClassName({ variant, size, iconOnly }), className)}
      {...props}
    />
  );
}

export type DialogPopupProps = Omit<BaseDialog.Popup.Props, 'className'> & {
  /** Widths the kit draws: 480 (default), 620 (tavola preview), 400 (alert) */
  width?: 400 | 480 | 620;
  className?: string;
};

/** The dialog panel, over the scrim, centred in the viewport */
export function DialogPopup({ width = 480, className, style, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={clsx('cx-scrim', styles.backdrop)} />
      <BaseDialog.Viewport className={styles.viewport}>
        <BaseDialog.Popup
          className={clsx('cx-dialog', className)}
          style={{ width, ...style }}
          {...props}
        />
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

export type DialogHeaderProps = {
  /** Title of the dialog; it names the dialog for screen readers */
  title: ReactNode;
  /** Small sanguine label above the title: "Fol. 02 · Tav. I" */
  label?: ReactNode;
  /** Accessible name of the close button (translated). Without it there is no close button. */
  closeLabel?: string;
};

/** Label, title and the Ghost close button */
export function DialogHeader({ title, label, closeLabel }: DialogHeaderProps) {
  return (
    <div className="cx-dialog-head">
      <div className={styles.titles}>
        {label != null && <span className="cx-label">{label}</span>}
        <BaseDialog.Title className="cx-h3">{title}</BaseDialog.Title>
      </div>
      {closeLabel && (
        <DialogClose iconOnly aria-label={closeLabel}>
          <XIcon />
        </DialogClose>
      )}
    </div>
  );
}

/** The dialog's content: a column with 12px gaps */
export function DialogBody({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div className={clsx('cx-dialog-body', className)} {...props} />;
}

/** Text that describes the dialog, read by screen readers after the title */
export function DialogDescription(props: BaseDialog.Description.Props) {
  return <BaseDialog.Description {...props} />;
}

/** Actions on a sunk strip, aligned right: Ghost + Primary */
export function DialogFooter({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div className={clsx('cx-dialog-foot', className)} {...props} />;
}
