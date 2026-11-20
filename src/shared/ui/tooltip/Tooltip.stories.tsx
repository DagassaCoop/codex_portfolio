import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, waitFor } from 'storybook/test';

import { Badge } from '@/shared/ui/badge';
import { buttonClassName } from '@/shared/ui/button';
import { GithubIcon, MailIcon } from '@/shared/ui/icons';
import { Kbd } from '@/shared/ui/kbd';

import { Tooltip } from './Tooltip';

/* Follows kit sheet 05 Overlays & feedback, §01 Tooltip */

const iconLink = buttonClassName({ variant: 'secondary', iconOnly: true });

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
  args: {
    content: 'GitHub ↗',
    side: 'right',
    children: (
      <a href="#" aria-label="GitHub" className={iconLink}>
        <GithubIcon />
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '48px 24px', minHeight: 160 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Hover or focus the icon: the tooltip opens after 300ms */
export const Playground: Story = {};

/** Social rail: tooltip on the right */
export const Right: Story = { args: { defaultOpen: true } };

/** With a dark key hint inside */
export const WithKbd: Story = {
  args: {
    defaultOpen: true,
    content: (
      <>
        Copy email · <Kbd tone="dark">C</Kbd>
      </>
    ),
    children: (
      <a href="#" aria-label="Email" className={iconLink}>
        <MailIcon />
      </a>
    ),
  },
};

/** Above a stack badge */
export const Top: Story = {
  args: {
    defaultOpen: true,
    side: 'top',
    content: 'Since 2020 · daily',
    children: (
      <Badge tone="outline" tabIndex={0}>
        React
      </Badge>
    ),
  },
};

export const OpensOnKeyboardFocus: Story = {
  name: 'Test · opens on keyboard focus, closes on Esc',
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'GitHub' })).toHaveFocus();

    // The tooltip renders in a portal, outside the story root
    const tip = await screen.findByText('GitHub ↗');
    await expect(tip).toHaveClass('cx-tip', 'cx-tip--right');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByText('GitHub ↗')).toBeNull());
  },
};
