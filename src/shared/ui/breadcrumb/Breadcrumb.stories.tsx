import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Breadcrumb } from './Breadcrumb';

/* Follows kit sheet 03 Navigation, §03 Breadcrumb: Codex / Fol. 02 / Tav. III */

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  args: {
    'aria-label': 'Breadcrumb',
    items: [
      { label: 'Codex', href: '/' },
      { label: 'Fol. 02', href: '/work' },
      { label: 'Tav. III' },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CaseStudy: Story = {};

/** Hover forced on "Fol. 02" for comparison with the sheet */
export const LinkStates: Story = {
  parameters: { pseudo: { hover: 'a[href$="/work"]' } },
};

export const CurrentIsLast: Story = {
  name: 'Test · links are locale-aware, the last item is the current page',
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Fol. 02' })).toHaveAttribute('href', '/en/work');
    await expect(canvas.getByText('Tav. III')).toHaveAttribute('aria-current', 'page');
    await expect(canvas.queryByRole('link', { name: 'Tav. III' })).toBeNull();
  },
};
