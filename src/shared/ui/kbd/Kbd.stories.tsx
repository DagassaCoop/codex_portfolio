import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Kbd } from './Kbd';
import styles from './Kbd.stories.module.css';

/* Hints follow kit sheet 01 Actions, §05 Kbd */

const meta = {
  title: 'Actions/Kbd',
  component: Kbd,
  args: { children: 'K', tone: 'light' },
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'dark'] } },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Hints: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="cx-cols-3">
      <div className="cx-panel cx-inline">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <span className="cx-small">Open codex index</span>
      </div>
      <div className="cx-panel cx-inline">
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
        <span className="cx-small">Prev / next tavola</span>
        <Kbd>Esc</Kbd>
        <span className="cx-small">Close</span>
      </div>
      <div className={`cx-panel cx-inline ${styles.inkPanel}`}>
        <Kbd tone="dark">⌘</Kbd>
        <Kbd tone="dark">K</Kbd>
        <span className={`cx-small ${styles.onInk}`}>On ink (tooltip)</span>
      </div>
    </div>
  ),
};
