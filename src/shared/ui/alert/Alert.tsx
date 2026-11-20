import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

/* The kit's letter icons */
const icons: Record<AlertTone, string> = { info: 'i', success: '✓', warning: '!', error: '×' };

export type AlertProps = Omit<ComponentPropsWithRef<'div'>, 'title' | 'role'> & {
  /** info: neutral · success · warning · error */
  tone?: AlertTone;
  /** Short title (translated). For `error` the "ERR — " prefix is added automatically. */
  title: ReactNode;
  /** Details; for errors include a way out, e.g. a "try again" link or the email address */
  children?: ReactNode;
};

/**
 * Kit alert (DESIGN.md §7): the status of a form or an action.
 * Errors are announced at once (role="alert"); the others politely (role="status").
 *
 * @example
 * <Alert tone="success" title="Message sent">Thanks — a copy is on its way to your inbox.</Alert>
 * <Alert tone="error" title="Couldn’t send">Network error. <a className="cx-tlink" href="…">Try again</a>.</Alert>
 */
export function Alert({ tone = 'info', title, children, className, ...props }: AlertProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={clsx('cx-alert', tone !== 'info' && `cx-alert--${tone}`, className)}
      {...props}
    >
      <span className="cx-alert-ico" aria-hidden="true">
        {icons[tone]}
      </span>
      <span className="cx-alert-title">
        {tone === 'error' && 'ERR — '}
        {title}
      </span>
      {children != null && <span className="cx-alert-desc">{children}</span>}
    </div>
  );
}
