import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type CheckboxProps = Omit<BaseCheckbox.Root.Props, 'className' | 'children'> & {
  /** The visible label next to the box. It is also the checkbox's accessible name. */
  children: ReactNode;
  /** Red border, e.g. a required consent left unchecked. Inside a `Field` with an `error`, this is automatic. */
  invalid?: boolean;
  className?: string;
};

/**
 * Kit checkbox (DESIGN.md §4) on Base UI Checkbox. The whole 44px row is a <label>.
 * Supports `indeterminate` ("All stacks" when only some are checked).
 *
 * @example
 * <Checkbox name="consent" checked={consent} onCheckedChange={setConsent}>
 *   I agree to be contacted back
 * </Checkbox>
 */
export function Checkbox({ children, invalid, disabled, className, ...props }: CheckboxProps) {
  return (
    <label className={clsx('cx-crow', className)} data-disabled={disabled || undefined}>
      <BaseCheckbox.Root
        className="cx-check"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        {...props}
      />
      {children}
    </label>
  );
}
