import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';

import { Chip } from './Chip';

/* States and sample copy follow kit sheet 04 Data display, §03 Chip (Work filter) */

const meta = {
  title: 'Data display/Chip',
  component: Chip,
  args: { children: 'Frontend', count: '04', disabled: false },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Component"
      states={['on', 'default', 'hover', 'active', 'focus', 'disabled']}
      rows={[
        {
          name: 'Chip',
          note: 'Work filter',
          render: (state) => (
            <Chip pressed={state === 'on'} disabled={state === 'disabled'} count="04">
              Frontend
            </Chip>
          ),
        },
      ]}
    />
  ),
};

/** A single-choice filter row, as on the Work page */
function WorkFilter() {
  const filters = [
    { value: 'all', label: 'All', count: '06' },
    { value: 'frontend', label: 'Frontend', count: '04' },
    { value: 'fullstack', label: 'Fullstack', count: '02' },
    { value: 'pet', label: 'Pet' },
  ];
  const [active, setActive] = useState('all');

  return (
    <div className="cx-inline" role="group" aria-label="Filter tavole">
      {filters.map((filter) => (
        <Chip
          key={filter.value}
          pressed={active === filter.value}
          onPressedChange={() => setActive(filter.value)}
          count={filter.count}
        >
          {filter.label}
        </Chip>
      ))}
      <Chip disabled>Mobile</Chip>
    </div>
  );
}

export const FilterRow: Story = {
  render: () => <WorkFilter />,
  play: async ({ canvas, userEvent }) => {
    const all = canvas.getByRole('button', { name: /All/ });
    const frontend = canvas.getByRole('button', { name: /Frontend/ });
    await expect(all).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(frontend);
    await expect(frontend).toHaveAttribute('aria-pressed', 'true');
    await expect(all).toHaveAttribute('aria-pressed', 'false');
  },
};
