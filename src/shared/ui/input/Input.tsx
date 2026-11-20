import { Input as BaseInput } from '@base-ui/react/input';
import clsx from 'clsx';

export type InputProps = Omit<BaseInput.Props, 'className'> & {
  className?: string;
};

/**
 * Kit text input (DESIGN.md §4) on Base UI Input.
 * Inside a `Field` it is labelled, described and marked invalid automatically.
 * Outside a Field, give it an `aria-label`.
 *
 * @example
 * <Field label="Name" required><Input name="name" required /></Field>
 */
export function Input({ className, ...props }: InputProps) {
  return <BaseInput className={clsx('cx-input', className)} {...props} />;
}
