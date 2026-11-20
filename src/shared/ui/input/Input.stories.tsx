import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';

import { Input } from './Input';

/* States follow kit sheet 02 Forms, §01 (row "Input"). Typing = the caret is in the field. */

const meta = {
  title: 'Forms/Input',
  component: Input,
  args: { 'aria-label': 'Name', placeholder: 'Your name', disabled: false },
} satisfies Meta<typeof Input>;

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
          name: 'Input',
          note: '44 · white',
          render: (state) => (
            <Input
              aria-label={`Name, ${state}`}
              placeholder="Your name"
              defaultValue={state === 'typing' || state === 'focus' ? 'Dmytro' : undefined}
              disabled={state === 'disabled'}
            />
          ),
        },
        {
          name: 'Invalid',
          note: 'aria-invalid',
          render: (state) => (
            <Input
              aria-label={`Email, ${state}`}
              defaultValue="jane@acme"
              aria-invalid="true"
              disabled={state === 'disabled'}
            />
          ),
        },
      ]}
    />
  ),
};

export const TypingWorks: Story = {
  name: 'Test · typing updates the value',
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Name' });
    await userEvent.type(input, 'Dmytro');
    await expect(input).toHaveValue('Dmytro');
  },
};
