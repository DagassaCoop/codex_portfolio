import { Button as BaseButton } from '@base-ui/react/button';
import { Input as BaseInput } from '@base-ui/react/input';
import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

export type InputGroupProps = ComponentPropsWithRef<'div'> & {
  /** Hatches the whole group. Also pass `disabled` to the input and button inside. */
  disabled?: boolean;
};

/**
 * Kit input group (DESIGN.md §4): one framed control made of an input plus addons and/or
 * a field button. Compose it from the parts below, in visual order.
 *
 * @example
 * <InputGroup>
 *   <InputGroupAddon>https://</InputGroupAddon>
 *   <InputGroupInput aria-label="Website" placeholder="site.com" />
 * </InputGroup>
 *
 * <InputGroup>
 *   <InputGroupInput type="email" aria-label="Email" />
 *   <InputGroupButton>Send</InputGroupButton>
 * </InputGroup>
 */
export function InputGroup({ disabled, className, ...props }: InputGroupProps) {
  return (
    <div
      className={clsx('cx-igroup', className)}
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

export type InputGroupAddonProps = ComponentPropsWithRef<'span'> & {
  /** `start` = prefix (https://), `end` = suffix */
  position?: 'start' | 'end';
};

/** Static text or an icon at the start or end of the group: `https://`, `.com`, a search icon. */
export function InputGroupAddon({ position = 'start', className, ...props }: InputGroupAddonProps) {
  return (
    <span
      className={clsx('cx-addon', position === 'end' && 'cx-addon--end', className)}
      {...props}
    />
  );
}

export type InputGroupInputProps = Omit<BaseInput.Props, 'className'> & {
  className?: string;
};

/** The group's input (Base UI Input). Inside a `Field` it is labelled and validated like Input. */
export function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return <BaseInput className={className} {...props} />;
}

export type InputGroupButtonProps = Omit<BaseButton.Props, 'className'> & {
  className?: string;
};

/** The "field button" at the end of the group: ink fill, mono label (SEND, COPY). */
export function InputGroupButton({ className, type = 'button', ...props }: InputGroupButtonProps) {
  return <BaseButton type={type} className={clsx('cx-ibtn', className)} {...props} />;
}
