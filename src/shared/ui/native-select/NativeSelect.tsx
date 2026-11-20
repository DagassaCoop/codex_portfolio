import { Field } from '@base-ui/react/field';
import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type NativeSelectProps = Omit<ComponentPropsWithRef<'select'>, 'className'> & {
  className?: string;
};

/**
 * The browser's own <select> in kit styling (DESIGN.md §4). Mobile-friendly: the OS picker opens.
 * Children are plain <option> / <optgroup>. Inside a `Field` it is labelled and validated like Input.
 * For the kit's custom listbox, use `Select`.
 *
 * @example
 * <Field label="Request type">
 *   <NativeSelect name="type" defaultValue="job">
 *     <option value="job">Job offer</option>
 *     <option value="freelance">Freelance</option>
 *   </NativeSelect>
 * </Field>
 */
export function NativeSelect({ className, ...props }: NativeSelectProps) {
  return (
    <Field.Control
      render={<select className={clsx('cx-select', 'cx-select-native', className)} {...props} />}
    />
  );
}
