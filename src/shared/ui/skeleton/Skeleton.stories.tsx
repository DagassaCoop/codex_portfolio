import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { CardBody } from '@/shared/ui/card';

import { Skeleton } from './Skeleton';

/* Follows kit sheet 04 Data display, §12 Skeleton: a tavola card while it loads */

const meta = {
  title: 'Data display/Skeleton',
  component: Skeleton,
  args: { width: 240, height: 16 },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CardLoading: Story = {
  name: 'Card loading',
  render: () => (
    <div
      className="cx-card"
      role="status"
      aria-busy="true"
      aria-label="Loading tavola"
      style={{ width: 300 }}
    >
      <Skeleton style={{ aspectRatio: '16 / 10', borderRadius: 0 }} />
      <CardBody>
        <Skeleton height={16} width="70%" />
        <Skeleton height={12} width="45%" />
        <div className="cx-inline">
          <Skeleton height={20} width={56} />
          <Skeleton height={20} width={48} />
        </div>
      </CardBody>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Loading tavola')).toHaveAttribute('aria-busy', 'true');
  },
};
