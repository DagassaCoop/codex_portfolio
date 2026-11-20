import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';

import { Radio, RadioGroup } from './RadioGroup';

/* States follow kit sheet 02 Forms, §05 Radio; the horizontal group is the §07 contact form layout */

const meta = {
  title: 'Forms/Radio Group',
  component: RadioGroup,
  args: { legend: 'Request type', name: 'type', defaultValue: 'job', children: null },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="job">Job offer</Radio>
      <Radio value="freelance">Freelance</Radio>
      <Radio value="question">Question</Radio>
      <Radio value="other">Other</Radio>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { legend: 'Budget', name: 'budget', defaultValue: 'mid', orientation: 'horizontal' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="low">&lt; $5k</Radio>
      <Radio value="mid">$5–10k</Radio>
      <Radio value="high">$10k+</Radio>
    </RadioGroup>
  ),
};

/** Each row is its own one-option group, so every cell shows a single radio */
export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Value"
      states={['default', 'hover', 'active', 'focus', 'disabled']}
      rows={[false, true].map((selected) => ({
        name: 'Radio',
        note: selected ? 'selected' : 'unselected',
        render: (state) => (
          <RadioGroup
            legend={`${selected ? 'Selected' : 'Unselected'}, ${state}`}
            value={selected ? 'a' : null}
          >
            <Radio value="a" disabled={state === 'disabled'}>
              {selected ? '$5–10k' : '< $5k'}
            </Radio>
          </RadioGroup>
        ),
      }))}
    />
  ),
};

/* ---------- Behaviour ---------- */

export const ArrowKeysSelect: Story = {
  name: 'Test · named by the legend, arrows move the selection',
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('radiogroup', { name: 'Request type' })).toBeVisible();

    const job = canvas.getByRole('radio', { name: 'Job offer' });
    const freelance = canvas.getByRole('radio', { name: 'Freelance' });
    await expect(job).toHaveAttribute('aria-checked', 'true');

    job.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(freelance).toHaveFocus();
    await expect(freelance).toHaveAttribute('aria-checked', 'true');
  },
};
