import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AspectRatio } from './AspectRatio';

/* Ratios follow kit sheet 04 Data display, §03 Aspect Ratio, and DESIGN.md §6 */

const meta = {
  title: 'Data display/Aspect Ratio',
  component: AspectRatio,
  parameters: { layout: 'padded' },
  args: { ratio: 16 / 9, label: '16 : 9' },
  render: (args) => (
    <div style={{ width: 420 }}>
      <AspectRatio {...args} />
    </div>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const KitRatios: Story = {
  render: () => (
    <div className="cx-cols-4" style={{ alignItems: 'end', maxWidth: 1000 }}>
      <AspectRatio ratio={16 / 9} label="16 : 9" />
      <AspectRatio ratio={4 / 5} label="4 : 5" />
      <AspectRatio ratio={16 / 7} label="16 : 7 · dialog" />
      <AspectRatio ratio={16 / 10} label="16 : 10 · card" />
    </div>
  ),
};
