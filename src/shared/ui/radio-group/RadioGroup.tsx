import { Fieldset } from '@base-ui/react/fieldset';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './RadioGroup.module.css';

export type RadioGroupProps = Omit<BaseRadioGroup.Props, 'className' | 'children'> & {
  /** The group's label, shown in the kit's field-label style (a fieldset legend) */
  legend: ReactNode;
  /** `<Radio>` items */
  children: ReactNode;
  /** `horizontal` puts the options in a wrapping row (kit contact form); default is a column */
  orientation?: 'vertical' | 'horizontal';
  className?: string;
};

/**
 * Kit radio group (DESIGN.md §4): a fieldset with a legend and `<Radio>` rows,
 * on Base UI RadioGroup + Fieldset. Arrow keys move between options.
 * For an error message, wrap it in `<Field error={…}>` (without a Field label).
 *
 * @example
 * <RadioGroup legend="Budget" name="budget" defaultValue="mid" orientation="horizontal">
 *   <Radio value="low">&lt; $5k</Radio>
 *   <Radio value="mid">$5–10k</Radio>
 * </RadioGroup>
 */
export function RadioGroup({
  legend,
  children,
  orientation = 'vertical',
  className,
  ...props
}: RadioGroupProps) {
  return (
    <Fieldset.Root
      className={clsx('cx-field', styles.fieldset, className)}
      render={<BaseRadioGroup {...props} />}
    >
      <Fieldset.Legend className="cx-flabel">{legend}</Fieldset.Legend>
      <div className={orientation === 'horizontal' ? styles.row : styles.column}>{children}</div>
    </Fieldset.Root>
  );
}

export type RadioProps = Omit<BaseRadio.Root.Props, 'className' | 'children'> & {
  /** The visible label of this option */
  children: ReactNode;
  className?: string;
};

/** One option of a `RadioGroup`: a 20px dot in a 44px clickable row. */
export function Radio({ children, disabled, className, ...props }: RadioProps) {
  return (
    <label className={clsx('cx-crow', className)} data-disabled={disabled || undefined}>
      <BaseRadio.Root className="cx-radio" disabled={disabled} {...props} />
      {children}
    </label>
  );
}
