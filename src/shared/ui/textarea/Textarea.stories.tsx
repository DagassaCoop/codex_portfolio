import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';
import { Field } from '@/shared/ui/field';

import { Textarea } from './Textarea';

/* States follow kit sheet 02 Forms, §01 (row "Textarea"): min 120px, resizes vertically */

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: { 'aria-label': 'Message', placeholder: 'Tell me about the project…', disabled: false },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Component"
      states={['default', 'hover', 'typing', 'focus', 'disabled']}
      rows={[
        {
          name: 'Textarea',
          note: 'min 120 · resize ↕',
          render: (state) => (
            <Textarea
              aria-label={`Message, ${state}`}
              placeholder="Tell me about the project…"
              defaultValue={
                state === 'typing' || state === 'focus' ? 'We need a multi-brand…' : undefined
              }
              disabled={state === 'disabled'}
            />
          ),
        },
      ]}
    />
  ),
};

/** Counter in the Field, as in the contact form */
export const WithCounter: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Field label="Message" counter="0 / 1000">
        <Textarea name="message" maxLength={1000} placeholder="Tell me about the project…" />
      </Field>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole('textbox', { name: 'Message' });
    await expect(textarea).toHaveClass('cx-textarea');
    await userEvent.type(textarea, 'Hello');
    await expect(textarea).toHaveValue('Hello');
  },
};
