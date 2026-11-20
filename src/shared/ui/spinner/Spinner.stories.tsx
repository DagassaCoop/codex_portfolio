import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Spinner } from './Spinner';
import styles from './Spinner.stories.module.css';

/* Follows kit sheet 02 Forms, §06 Spinner */

const meta = {
  title: 'Forms/Spinner',
  component: Spinner,
  args: { label: 'Loading', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'lg'] } },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status', { name: 'Loading' })).toBeVisible();
  },
};

/** Colours used on the kit sheet: currentColor of ink, sanguine, muted, and paper on ink */
export const Colours: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="cx-cols-3">
      <div className="cx-panel cx-inline">
        <Spinner label="Loading" />
        <span className={styles.sanguine}>
          <Spinner size="lg" label="Loading" />
        </span>
        <span className="cx-small">Dashed circle and a compass needle, 1.4 s per turn.</span>
      </div>
      <div className={`cx-panel cx-inline ${styles.muted}`}>
        <Spinner label="Sending" />
        <span className={`cx-label ${styles.labelSmall}`}>Sending dispatch…</span>
      </div>
      <div className={`cx-panel cx-inline ${styles.inkPanel}`}>
        <Spinner label="Loading" />
        <span className={`cx-label ${styles.labelSmall} ${styles.onInkText}`}>On ink</span>
      </div>
    </div>
  ),
};
