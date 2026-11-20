import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Pagination, PaginationLink } from './Pagination';

/* Follows kit sheet 03 Navigation, §04 Pagination: between tavole, Roman numerals */

function Tavole() {
  return (
    <Pagination aria-label="Tavole">
      <PaginationLink href="/work/tav-2" wide>
        ← Tav. II
      </PaginationLink>
      <PaginationLink href="/work/tav-1" aria-label="Tavola I">
        I
      </PaginationLink>
      <PaginationLink href="/work/tav-2" aria-label="Tavola II">
        II
      </PaginationLink>
      <PaginationLink href="/work/tav-3" aria-label="Tavola III" current>
        III
      </PaginationLink>
      <PaginationLink href="/work/tav-4" aria-label="Tavola IV">
        IV
      </PaginationLink>
      <PaginationLink href="/work/tav-5" aria-label="Tavola V">
        V
      </PaginationLink>
      <PaginationLink disabled aria-label="Tavola VI, in progress">
        VI
      </PaginationLink>
      <PaginationLink href="/work/tav-4" wide>
        Tav. IV →
      </PaginationLink>
    </Pagination>
  );
}

const meta = {
  title: 'Navigation/Pagination',
  component: Tavole,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tavole>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** As on the sheet: II hover, IV active, V focus (III current, VI in progress) */
export const States: Story = {
  parameters: {
    pseudo: {
      hover: 'a[href$="/work/tav-2"]:not(.cx-page--wide)',
      active: 'a[href$="/work/tav-4"]:not(.cx-page--wide)',
      focusVisible: 'a[href$="/work/tav-5"]',
    },
  },
};

export const CurrentAndDisabled: Story = {
  name: 'Test · current page and the unavailable one',
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Tavola III' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(canvas.queryByRole('link', { name: /Tavola VI/ })).toBeNull();
    await expect(canvas.getByText('VI')).toHaveAttribute('aria-disabled', 'true');
  },
};
