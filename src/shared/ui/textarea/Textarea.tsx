import { Field } from '@base-ui/react/field';
import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type TextareaProps = Omit<ComponentPropsWithRef<'textarea'>, 'className'> & {
  className?: string;
};

/**
 * Kit textarea (DESIGN.md §4): min 120px tall, resizes vertically.
 * Rendered through Base UI Field.Control, so inside a `Field` it is labelled and validated
 * like Input. For the counter, pass `counter` to the Field.
 *
 * @example
 * <Field label="Message" counter={`${message.length} / 1000`}>
 *   <Textarea name="message" maxLength={1000} value={message} onChange={…} />
 * </Field>
 */
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <Field.Control render={<textarea className={clsx('cx-textarea', className)} {...props} />} />
  );
}
