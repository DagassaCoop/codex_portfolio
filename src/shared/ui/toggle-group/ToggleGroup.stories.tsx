import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LayoutGrid, List } from 'lucide-react';
import { expect } from 'storybook/test';

import { Toggle } from '@/shared/ui/toggle';

import { ToggleGroup } from './ToggleGroup';

/*
 * Compositions follow kit sheet 01 Actions, §03 Toggle Group.
 * Language is EN | FR (the sheet shows RU, see DESIGN.md §9.1). The Theme group is not used: one theme only.
 */

const meta = {
  title: 'Actions/Toggle Group',
  component: ToggleGroup,
  args: { 'aria-label': 'Language', defaultValue: ['en'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <Toggle value="en">EN</Toggle>
      <Toggle value="fr">FR</Toggle>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Language: Story = {};

/** Hover forced on "List" for comparison with the sheet */
export const ViewWithHover: Story = {
  name: 'View · hover on List',
  args: { 'aria-label': 'View', defaultValue: ['grid'] },
  parameters: { pseudo: { hover: '[data-kit-state="hover"]' } },
  render: (args) => (
    <ToggleGroup {...args}>
      <Toggle value="grid">Grid</Toggle>
      <Toggle value="list" data-kit-state="hover">
        List
      </Toggle>
    </ToggleGroup>
  ),
};

export const IconView: Story = {
  name: 'View · icons',
  args: { 'aria-label': 'View', defaultValue: ['grid'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <Toggle value="grid" iconOnly aria-label="Grid view">
        <LayoutGrid strokeWidth={1.6} aria-hidden />
      </Toggle>
      <Toggle value="list" iconOnly aria-label="List view">
        <List strokeWidth={1.6} aria-hidden />
      </Toggle>
    </ToggleGroup>
  ),
};

export const WithDisabledItem: Story = {
  name: 'Filter · disabled item',
  args: { 'aria-label': 'Filter', defaultValue: ['all'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <Toggle value="all">All</Toggle>
      <Toggle value="front">Front</Toggle>
      <Toggle value="mobile" disabled>
        Mobile
      </Toggle>
    </ToggleGroup>
  ),
};

/* ---------- Behaviour ---------- */

export const SingleChoice: Story = {
  name: 'Test · one item pressed, arrows move focus',
  play: async ({ canvas, userEvent }) => {
    const en = canvas.getByRole('button', { name: 'EN' });
    const fr = canvas.getByRole('button', { name: 'FR' });
    await expect(en).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(fr);
    await expect(fr).toHaveAttribute('aria-pressed', 'true');
    await expect(en).toHaveAttribute('aria-pressed', 'false');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(en).toHaveFocus();
  },
};
