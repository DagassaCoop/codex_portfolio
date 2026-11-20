import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './InputGroup';

/* States follow kit sheet 02 Forms, §01 (rows "Input Group" and "Input + Button") */

const meta = {
  title: 'Forms/Input Group',
  component: InputGroup,
  args: { disabled: false },
  render: (args) => (
    <div style={{ width: 320 }}>
      <InputGroup {...args}>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput aria-label="Website" placeholder="site.com" disabled={args.disabled} />
      </InputGroup>
    </div>
  ),
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Prefix: Story = {};

export const FieldButton: Story = {
  name: 'Field button',
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup>
        <InputGroupInput type="email" aria-label="Email" placeholder="you@company.com" />
        <InputGroupButton>SEND</InputGroupButton>
      </InputGroup>
    </div>
  ),
};

export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Component"
      states={['default', 'hover', 'typing', 'focus', 'disabled']}
      rows={[
        {
          name: 'Input Group',
          note: 'prefix addon',
          render: (state) => {
            const disabled = state === 'disabled';
            const filled = state === 'typing' || state === 'focus';
            return (
              <InputGroup disabled={disabled}>
                <InputGroupAddon>https://</InputGroupAddon>
                <InputGroupInput
                  aria-label={`Website, ${state}`}
                  placeholder="site.com"
                  defaultValue={filled ? 'bondar.dev' : undefined}
                  disabled={disabled}
                />
              </InputGroup>
            );
          },
        },
        {
          name: 'Input + Button',
          note: '“field button”',
          render: (state) => {
            const disabled = state === 'disabled';
            const filled = state === 'typing' || state === 'focus';
            return (
              <InputGroup disabled={disabled}>
                <InputGroupInput
                  type="email"
                  aria-label={`Email, ${state}`}
                  placeholder="you@company.com"
                  defaultValue={filled ? 'hr@acme.ca' : undefined}
                  disabled={disabled}
                />
                <InputGroupButton disabled={disabled}>SEND</InputGroupButton>
              </InputGroup>
            );
          },
        },
      ]}
    />
  ),
};

/* ---------- Behaviour ---------- */

export const ButtonClick: Story = {
  name: 'Test · typing into the group',
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup>
        <InputGroupInput type="email" aria-label="Email" />
        <InputGroupButton>SEND</InputGroupButton>
      </InputGroup>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await userEvent.type(input, 'hr@acme.ca');
    await expect(input).toHaveValue('hr@acme.ca');
    await expect(canvas.getByRole('button', { name: 'SEND' })).toHaveClass('cx-ibtn');
  },
};
