import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Alert } from './Alert';

/* Tones and sample copy follow kit sheet 05 Overlays & feedback, §05 Alert */

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  args: { tone: 'info', title: 'Replies within two working days', children: 'Toronto time, EST.' },
  argTypes: { tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] } },
  decorators: [
    (Story) => (
      <div className="cx-stack" style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <>
      <Alert title="Replies within two working days">Toronto time, EST.</Alert>
      <Alert tone="success" title="Message sent">
        Thanks — a copy is on its way to your inbox.
      </Alert>
      <Alert tone="warning" title="Demo is on a staging server">
        Data resets nightly; some pages may be offline.
      </Alert>
      <Alert tone="error" title="Couldn’t send">
        Network error. Your text is saved —{' '}
        <a href="#" className="cx-tlink">
          try again
        </a>
        .
      </Alert>
    </>
  ),
  play: async ({ canvas }) => {
    // Errors are announced at once, the rest politely
    await expect(canvas.getByRole('alert')).toHaveTextContent('ERR — Couldn’t send');
    await expect(canvas.getAllByRole('status')).toHaveLength(3);
  },
};
