import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';
import { LayoutGridIcon } from '@/shared/ui/icons';

import { Toggle } from './Toggle';

/* Rows and sample copy follow kit sheet 01 Actions, §03 Toggle */

const meta = {
  title: 'Actions/Toggle',
  component: Toggle,
  args: { children: 'Live only', disabled: false },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** States as on the kit sheet. Hover / active / focus are forced for comparison. */
export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Component"
      states={['default', 'hover', 'active', 'on', 'focus', 'disabled']}
      rows={[
        {
          name: 'Toggle',
          note: '“Live only” filter',
          render: (state) => (
            <Toggle pressed={state === 'on'} disabled={state === 'disabled'}>
              Live only
            </Toggle>
          ),
        },
        {
          name: 'Toggle icon',
          note: 'grid / list',
          render: (state) => (
            <Toggle
              iconOnly
              aria-label="Grid view"
              pressed={state === 'on'}
              disabled={state === 'disabled'}
            >
              <LayoutGridIcon />
            </Toggle>
          ),
        },
      ]}
    />
  ),
};

/* ---------- Behaviour ---------- */

export const PressToggles: Story = {
  name: 'Test · click and Space toggle aria-pressed',
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: 'Live only' });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await userEvent.keyboard(' ');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  },
};
