import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Badge } from './Badge';

/* Tones and sample copy follow kit sheet 04 Data display, §03 Badge */

const meta = {
  title: 'Data display/Badge',
  component: Badge,
  args: { children: 'React', tone: 'default', dot: false },
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'accent', 'solid', 'outline', 'success', 'warning', 'error'],
    },
    dot: { control: 'inline-radio', options: [false, true, 'pulse'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="cx-inline">
      <Badge>Default</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="solid">Solid</Badge>
      <Badge tone="outline">Outline</Badge>
      <Badge tone="success" dot="pulse">
        Available for work
      </Badge>
      <Badge tone="warning">Draft</Badge>
      <Badge tone="error">Archived</Badge>
    </div>
  ),
  play: async ({ canvas }) => {
    // The dot is decoration: the text alone is the badge's content
    await expect(canvas.getByText('Available for work').querySelector('.cx-dot')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  },
};
