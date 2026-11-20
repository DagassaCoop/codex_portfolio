import { Select as BaseSelect } from '@base-ui/react/select';
import clsx from 'clsx';
import { Fragment, type ReactNode } from 'react';

import { CheckIcon, ChevronDownIcon } from '@/shared/ui/icons';

export type SelectOption = {
  value: string;
  /** Visible text (translated) */
  label: string;
  disabled?: boolean;
};

export type SelectOptionGroup = {
  /** Group heading, e.g. "Work" */
  group: string;
  options: SelectOption[];
};

export type SelectProps = Omit<
  BaseSelect.Root.Props<string>,
  'children' | 'items' | 'multiple' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  /** Visible label above the trigger, in the kit's field-label style */
  label: ReactNode;
  /** Text in the trigger while nothing is selected */
  placeholder?: ReactNode;
  /** Flat list of options, or groups with a heading (separated by a line) */
  options: SelectOption[] | SelectOptionGroup[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Marks the trigger invalid. Inside a `Field` with an `error`, this happens automatically. */
  invalid?: boolean;
  className?: string;
};

function isGrouped(options: SelectProps['options']): options is SelectOptionGroup[] {
  return options.length > 0 && 'group' in options[0]!;
}

function Option({ option }: { option: SelectOption }) {
  return (
    <BaseSelect.Item className="cx-option" value={option.value} disabled={option.disabled}>
      <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator>
        <CheckIcon strokeWidth={2} />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

/**
 * Kit select (DESIGN.md §4) on Base UI Select: a trigger that opens the kit's listbox.
 * Keyboard: arrows, type-ahead, Enter, Esc. The label is part of the component (Base UI's
 * Select.Label); inside a `Field`, leave the Field's `label` out and use its `error` / `description`.
 *
 * @example
 * <Field error={errors.type?.message}>
 *   <Select label="Request type" placeholder="Choose one" name="type" options={[
 *     { value: 'job', label: 'Job offer' },
 *     { value: 'freelance', label: 'Freelance' },
 *   ]} />
 * </Field>
 */
export function Select({ label, placeholder, options, invalid, className, ...props }: SelectProps) {
  const groups: SelectOptionGroup[] = isGrouped(options) ? options : [{ group: '', options }];
  // Lets the trigger show the selected option's label instead of its value
  const items = groups.flatMap((group) => group.options);

  return (
    <BaseSelect.Root items={items} {...props}>
      <BaseSelect.Label className="cx-flabel">{label}</BaseSelect.Label>
      <BaseSelect.Trigger
        className={clsx('cx-select', className)}
        aria-invalid={invalid || undefined}
      >
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon render={<ChevronDownIcon strokeWidth={2} />} />
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false}>
          <BaseSelect.Popup className="cx-menu cx-select-popup">
            <BaseSelect.List>
              {groups.map((group, index) => (
                <Fragment key={group.group || index}>
                  {index > 0 && <BaseSelect.Separator className="cx-menu-sep" />}
                  {group.group ? (
                    <BaseSelect.Group>
                      <BaseSelect.GroupLabel className="cx-menu-label">
                        {group.group}
                      </BaseSelect.GroupLabel>
                      {group.options.map((option) => (
                        <Option key={option.value} option={option} />
                      ))}
                    </BaseSelect.Group>
                  ) : (
                    group.options.map((option) => <Option key={option.value} option={option} />)
                  )}
                </Fragment>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
