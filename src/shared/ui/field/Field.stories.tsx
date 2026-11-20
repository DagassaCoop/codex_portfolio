import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import { Field } from './Field';

/* Anatomy and sample copy follow kit sheet 02 Forms, §02–03 Field */

const meta = {
  title: 'Forms/Field',
  component: Field,
  parameters: { layout: 'padded' },
  args: { label: 'Name', required: true, children: null },
  decorators: [
    (Story) => (
      <div className="cx-panel cx-stack" style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Label with the required marker, control, help text; a textarea with a counter */
export const Valid: Story = {
  render: () => (
    <>
      <Field label="Name" required description="How should I address you?">
        <Input name="name" defaultValue="Jane Cooper" required />
      </Field>
      <Field label="Message" counter="58 / 1000">
        <Textarea
          name="message"
          maxLength={1000}
          defaultValue="Looking for a senior frontend for our design-system team."
        />
      </Field>
    </>
  ),
};

/** Error under the control with the "ERR —" prefix; the control turns red */
export const Errors: Story = {
  render: () => (
    <>
      <Field label="Email" required error="Add a domain, e.g. acme.com">
        <Input name="email" type="email" defaultValue="jane@acme" required />
      </Field>
      <Field label="Message" required error="A few words are enough.">
        <Textarea name="message" required />
      </Field>
    </>
  ),
  play: async ({ canvas }) => {
    const email = canvas.getByRole('textbox', { name: 'Email' });
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    // The error is announced with the control
    await expect(email).toHaveAccessibleDescription(/Add a domain/);
    await expect(canvas.getByText('Add a domain, e.g. acme.com')).toHaveClass('cx-ferr');
  },
};

/* ---------- Behaviour ---------- */

export const LinksLabelAndDescription: Story = {
  name: 'Test · label and help text are linked to the control',
  render: () => (
    <Field label="Name" required description="How should I address you?">
      <Input name="name" required />
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Name' });
    await expect(input).toHaveAccessibleDescription('How should I address you?');
    await expect(input).not.toHaveAttribute('aria-invalid', 'true');

    // Clicking the label focuses the input
    await userEvent.click(canvas.getByText('Name'));
    await expect(input).toHaveFocus();
  },
};
