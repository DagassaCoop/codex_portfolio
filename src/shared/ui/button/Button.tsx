import { Button as BaseButton } from '@base-ui/react/button';
import clsx from 'clsx';

import { Spinner } from '@/shared/ui/spinner';

export type ButtonVariant = 'primary' | 'ink' | 'secondary' | 'mono' | 'ghost' | 'danger' | 'link';

/** `md` = 44px (touch). `sm` = 36px, only in dense desktop panels. */
export type ButtonSize = 'md' | 'sm';

type ButtonLookProps = {
  /** Primary is the CTA: one per screen (DESIGN.md §0.6) */
  variant: ButtonVariant;
  size?: ButtonSize;
  /** Square icon button (44×44, or 36×36 with `sm`). Requires `aria-label`. */
  iconOnly?: boolean;
};

/**
 * Class names of a kit button, for elements that look like a button but are not one —
 * usually a link: `<Link href="/work" className={buttonClassName({ variant: 'primary' })}>`.
 */
export function buttonClassName({ variant, size = 'md', iconOnly = false }: ButtonLookProps) {
  return clsx(
    'cx-btn',
    `cx-btn--${variant}`,
    size === 'sm' && 'cx-btn--sm',
    iconOnly && 'cx-btn--icon',
  );
}

type IconOnlyProps = { iconOnly: true; 'aria-label': string } | { iconOnly?: false };

export type ButtonProps = Omit<BaseButton.Props, 'className'> &
  Omit<ButtonLookProps, 'iconOnly'> &
  IconOnlyProps & {
    /**
     * Shows the compass spinner before the label and ignores clicks, but keeps the variant's
     * colours (no hatching) and stays focusable. Change the label too: "Sending…".
     */
    loading?: boolean;
    className?: string;
  };

/**
 * Kit button (DESIGN.md §3) on Base UI Button.
 * Put icons in children: leading for actions (Download), trailing for external links (↗).
 *
 * @example
 * <Button variant="primary">Send message</Button>
 * <Button variant="ghost" iconOnly aria-label="Close"><XIcon /></Button>
 * <Button variant="primary" type="submit" loading={isSubmitting}>Sending…</Button>
 */
export function Button({
  variant,
  size,
  iconOnly,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      // While loading, Base UI blocks clicks but keeps the button focusable and not :disabled,
      // so the variant's colours stay (the kit shows a loading button in full colour).
      disabled={disabled || loading}
      focusableWhenDisabled={loading}
      aria-busy={loading || undefined}
      className={clsx(
        buttonClassName({ variant, size, iconOnly }),
        loading && 'is-loading',
        className,
      )}
      {...props}
    >
      {loading && <Spinner decorative />}
      {children}
    </BaseButton>
  );
}
