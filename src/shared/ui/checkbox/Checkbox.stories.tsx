import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';
import { Field } from '@/shared/ui/field';

import { Checkbox } from './Checkbox';

/* States follow kit sheet 02 Forms, §05 Checkbox */

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  args: { children: 'I agree to be contacted back', disabled: false, onCheckedChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Value"
      states={['default', 'hover', 'active', 'focus', 'disabled']}
      rows={[
        { name: 'Unchecked', label: 'Frontend', checked: false, indeterminate: false },
        { name: 'Checked', label: 'Fullstack', checked: true, indeterminate: false },
        { name: 'Indeterminate', label: 'All stacks', checked: false, indeterminate: true },
      ].map(({ name, label, checked, indeterminate }) => ({
        name: 'Checkbox',
        note: name.toLowerCase(),
        render: (state) => (
          <Checkbox checked={checked} indeterminate={indeterminate} disabled={state === 'disabled'}>
            {label}
          </Checkbox>
        ),
      }))}
    />
  ),
};

/** Required consent left unchecked: red border (kit sheet 02 §03) */
export const Invalid: Story = {
  render: (args) => (
    <Field error="Please confirm so I can reply.">
      <Checkbox {...args} invalid />
    </Field>
  ),
};

/* ---------- Behaviour ---------- */

export const LabelToggles: Story = {
  name: 'Test · label click and Space toggle it',
  play: async ({ args, canvas, userEvent }) => {
    const box = canvas.getByRole('checkbox', { name: 'I agree to be contacted back' });
    await expect(box).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(canvas.getByText('I agree to be contacted back'));
    await expect(box).toHaveAttribute('aria-checked', 'true');
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(1);

    box.focus();
    await userEvent.keyboard(' ');
    await expect(box).toHaveAttribute('aria-checked', 'false');
  },
};

export const IndeterminateIsMixed: Story = {
  name: 'Test · indeterminate reads as mixed',
  args: { children: 'All stacks', indeterminate: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  },
};
