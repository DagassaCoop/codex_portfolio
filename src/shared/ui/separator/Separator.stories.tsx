import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Dimension } from './Dimension';
import { Marker } from './Marker';
import { Separator } from './Separator';

/* Follows kit sheet 00 Foundations, §05 Separator / Marker */

const meta = {
  title: 'Data display/Separator & Marker',
  component: Separator,
  parameters: { layout: 'padded' },
  args: { tone: 'line' },
  argTypes: { tone: { control: 'inline-radio', options: ['line', 'ink', 'strong'] } },
  decorators: [
    (Story) => (
      <div className="cx-panel cx-stack" style={{ maxWidth: 420, gap: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const All: Story = {
  render: () => (
    <>
      <span className="cx-cap">Separator · line / ink / strong</span>
      <Separator />
      <Separator tone="ink" />
      <Separator tone="strong" />

      <span className="cx-cap">Marker</span>
      <Marker>
        Fol. 03 · <b>About</b>
      </Marker>

      <span className="cx-cap">Dimension</span>
      <Dimension>1280 PX</Dimension>

      <span className="cx-cap">Vertical</span>
      <div className="cx-inline" style={{ height: 32, gap: 14 }}>
        <span className="cx-small">Work</span>
        <Separator orientation="vertical" />
        <span className="cx-small">About</span>
        <Separator orientation="vertical" />
        <span className="cx-small">Contact</span>
      </div>
    </>
  ),
  play: async ({ canvas, canvasElement }) => {
    const separators = canvas.getAllByRole('separator');
    // 3 horizontal + the marker + 2 vertical; the dimension line is decorative
    await expect(separators).toHaveLength(6);
    await expect(canvasElement.querySelector('.cx-dim')).toHaveAttribute('aria-hidden', 'true');
  },
};
