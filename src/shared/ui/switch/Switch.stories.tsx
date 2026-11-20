import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';

import { pseudoStateParameters, StateMatrix, type KitState } from '@/shared/lib/storybook';

import { Switch } from './Switch';

/*
 * States follow kit sheet 01 Actions, §04 Switch. The sheet's sample label is "Notte" (the night theme,
 * which the project dropped); these stories use "Live demos only", another kit use of the switch.
 */

const meta = {
  title: 'Actions/Switch',
  component: Switch,
  args: { children: 'Live demos only', disabled: false, onCheckedChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const states: KitState[] = ['default', 'hover', 'active', 'focus', 'disabled'];

/** Off and on × states. Hover / active / focus are forced for comparison. */
export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="State"
      states={states}
      rows={[false, true].map((checked) => ({
        name: checked ? 'On' : 'Off',
        render: (state) => (
          <Switch checked={checked} disabled={state === 'disabled'}>
            Live demos only
          </Switch>
        ),
      }))}
    />
  ),
};

/* ---------- Behaviour ---------- */

export const LabelToggles: Story = {
  name: 'Test · label click and Space toggle it',
  play: async ({ args, canvas, userEvent }) => {
    const control = canvas.getByRole('switch', { name: 'Live demos only' });
    await expect(control).toHaveAttribute('aria-checked', 'false');

    // Clicking the label text toggles the switch
    await userEvent.click(canvas.getByText('Live demos only'));
    await expect(control).toHaveAttribute('aria-checked', 'true');
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(1);

    control.focus();
    await userEvent.keyboard(' ');
    await expect(control).toHaveAttribute('aria-checked', 'false');
  },
};

export const DisabledIgnoresInput: Story = {
  name: 'Test · disabled ignores input',
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const control = canvas.getByRole('switch');
    await expect(control).toHaveAttribute('data-disabled');
    await userEvent.click(canvas.getByText('Live demos only'));
    await expect(control).toHaveAttribute('aria-checked', 'false');
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};
