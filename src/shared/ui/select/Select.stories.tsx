import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, screen, waitFor } from 'storybook/test';

import { Field } from '@/shared/ui/field';

import { Select, type SelectOption, type SelectOptionGroup } from './Select';

/*
 * Follows kit sheet 02 Forms, §01 (row "Select") and §04 (open listbox).
 * The grouped options are the sheet's sample; the flat list is the contact form's request types.
 */

const requestTypes: SelectOption[] = [
  { value: 'job', label: 'Job offer' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'question', label: 'Question' },
  { value: 'other', label: 'Other' },
];

const kitSample: SelectOptionGroup[] = [
  {
    group: 'Work',
    options: [
      { value: 'full-time', label: 'Full-time role' },
      { value: 'contract', label: 'Contract / B2B' },
      { value: 'freelance', label: 'Freelance project' },
    ],
  },
  {
    group: 'Other',
    options: [
      { value: 'hi', label: 'Just saying hi' },
      { value: 'agency', label: 'Agency partnership — closed', disabled: true },
    ],
  },
];

const meta = {
  title: 'Forms/Select',
  component: Select,
  args: {
    label: 'Request type',
    placeholder: 'Request type',
    options: requestTypes,
    disabled: false,
    onValueChange: fn(),
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Field>
        <Select {...args} />
      </Field>
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The listbox open, with groups, a separator and a disabled option (kit sheet 02 §04) */
export const OpenWithGroups: Story = {
  name: 'Open · groups',
  args: { options: kitSample, defaultValue: 'full-time', defaultOpen: true },
  parameters: { layout: 'padded' },
};

export const Invalid: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Field error="Choose a request type.">
        <Select {...args} />
      </Field>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('combobox', { name: 'Request type' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  },
};

export const Disabled: Story = { args: { disabled: true } };

/* ---------- Behaviour ---------- */

export const PickWithKeyboard: Story = {
  name: 'Test · open with keyboard, pick an option',
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole('combobox', { name: 'Request type' });
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');

    // The listbox renders in a portal, outside the story root
    const listbox = await screen.findByRole('listbox');
    await expect(listbox.closest('.cx-menu')).not.toBeNull();

    await userEvent.click(screen.getByRole('option', { name: 'Freelance' }));
    await waitFor(() => expect(trigger).toHaveTextContent('Freelance'));
    await expect(args.onValueChange).toHaveBeenCalledWith('freelance', expect.anything());
  },
};
