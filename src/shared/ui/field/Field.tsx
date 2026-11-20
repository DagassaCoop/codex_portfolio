import { Field as BaseField } from '@base-ui/react/field';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type FieldProps = Omit<BaseField.Root.Props, 'className' | 'children' | 'invalid'> & {
  /** The control: Input, Textarea, NativeSelect, Select, RadioGroup… */
  children: ReactNode;
  /**
   * Visible label, linked to the control. Leave it out for controls that label themselves:
   * Select (`label` prop), RadioGroup (`legend`), Checkbox and Switch (their row text).
   */
  label?: ReactNode;
  /** Adds the sanguine `*` to the label. Also set `required` on the control itself. */
  required?: boolean;
  /** Help text under the control */
  description?: ReactNode;
  /**
   * Error message (translated). When set, the field is invalid: the control gets
   * aria-invalid, and the message is shown with the "ERR —" prefix and linked to it.
   */
  error?: ReactNode;
  /** Character counter, e.g. "58 / 1000" */
  counter?: ReactNode;
  className?: string;
};

/**
 * A labelled form field (DESIGN.md §4) on Base UI Field.
 * Base UI links the label, description and error to the control (id, aria-describedby).
 * Works with React Hook Form or server errors: pass the message to `error`.
 *
 * @example
 * <Field label="Email" required error={errors.email?.message}>
 *   <Input type="email" name="email" required />
 * </Field>
 */
export function Field({
  children,
  label,
  required,
  description,
  error,
  counter,
  className,
  ...props
}: FieldProps) {
  const hasError = error != null && error !== false && error !== '';

  return (
    <BaseField.Root className={clsx('cx-field', className)} invalid={hasError} {...props}>
      {label != null && (
        <BaseField.Label className="cx-flabel">
          {label}
          {required && <em aria-hidden="true"> *</em>}
        </BaseField.Label>
      )}
      {children}
      {description != null && (
        <BaseField.Description className="cx-fdesc">{description}</BaseField.Description>
      )}
      <BaseField.Error className="cx-ferr" match={hasError}>
        {error}
      </BaseField.Error>
      {counter != null && <span className="cx-counter">{counter}</span>}
    </BaseField.Root>
  );
}
