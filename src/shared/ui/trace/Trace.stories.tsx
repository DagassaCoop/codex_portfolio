import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Trace, TraceItem, type TraceLayout } from './Trace';

/* Entries and sample copy follow kit sheet 04 Data display, Trace (the timeline) */

function Timeline({ layout }: { layout?: TraceLayout }) {
  return (
    <div style={{ maxWidth: 420 }}>
      <Trace layout={layout}>
        <TraceItem year="2025—" node="current">
          <b className="cx-h4">BrightIT · Soft2Bet</b>
          <span className="cx-small">Frontend Developer · current</span>
        </TraceItem>
        <TraceItem year="2025">
          <b className="cx-h4">Fitofan</b>
          <span className="cx-small">Mississauga</span>
        </TraceItem>
        <TraceItem year="2022—24">
          <b className="cx-h4">Innopharma Technology</b>
          <span className="cx-small">Dublin</span>
        </TraceItem>
        <TraceItem year="next" node="future">
          <b className="cx-h4" style={{ color: 'var(--muted)' }}>
            Your team?
          </b>
          <a href="#contact" className="cx-tlink cx-small">
            Let’s talk ↗
          </a>
        </TraceItem>
      </Trace>
    </div>
  );
}

const meta = {
  title: 'Data display/Trace',
  component: Timeline,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `layout="adaptive"`: switch the viewport to a phone to see the year move above the body */
export const Adaptive: Story = { args: { layout: 'adaptive' } };

export const Structure: Story = {
  name: 'Test · an ordered list, nodes are decoration',
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('list')).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    for (const rail of canvasElement.querySelectorAll('.cx-trace-rail')) {
      await expect(rail).toHaveAttribute('aria-hidden', 'true');
    }
    await expect(canvasElement.querySelector('.cx-trace-node--current')).not.toBeNull();
    await expect(canvasElement.querySelector('.cx-trace-node--future')).not.toBeNull();
  },
};
