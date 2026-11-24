import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor } from 'storybook/test';

import { Badge } from '@/shared/ui/badge';

import { BadgeList } from './BadgeList';

/* Not on the kit sheets: the project cards' stack, added 2026-11-23 */

const STACK = ['Next.js', 'TypeScript', 'd3-hierarchy', 'GraphQL', 'Prisma', 'PostgreSQL'];

type StackProps = {
  width: number;
  items?: string[];
  collapse?: boolean | string;
};

function Stack({ width, items = STACK, collapse }: StackProps) {
  return (
    <div style={{ width }}>
      <BadgeList collapse={collapse} moreLabel={`Show all ${items.length} technologies`}>
        {items.map((name) => (
          <Badge key={name}>{name}</Badge>
        ))}
      </BadgeList>
    </div>
  );
}

const meta = {
  title: 'Data display/Badge list',
  component: Stack,
  args: { width: 280 },
  argTypes: { width: { control: { type: 'range', min: 120, max: 720, step: 10 } } },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Too many for one row: the first ones and "…". Drag the width to see it refit. */
export const Collapsed: Story = {};

/** Everything fits on one row: no "…" */
export const Fits: Story = { args: { width: 720 } };

export const KeepsToOneRow: Story = {
  name: 'Test · one row, then "…" shows them all',
  play: async ({ canvas, canvasElement, userEvent }) => {
    const more = await canvas.findByRole('button', { name: 'Show all 6 technologies' });
    await expect(more).toHaveTextContent('…');
    await expect(more).toHaveAttribute('aria-expanded', 'false');

    // Every visible badge and the "…" share the first row
    const list = canvasElement.querySelector('ul');
    const visible = Array.from(list?.children ?? []).filter(
      (item): item is HTMLElement => item instanceof HTMLElement && !item.hidden,
    );
    await expect(visible.length).toBeLessThan(STACK.length + 1);
    const tops = new Set(visible.map((item) => item.offsetTop));
    await expect(tops.size).toBe(1);
    await expect(canvas.queryByText('PostgreSQL')).not.toBeVisible();

    await userEvent.click(more);

    for (const name of STACK) await expect(canvas.getByText(name)).toBeVisible();
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
    // Focus stays on the list the button opened
    await waitFor(() => expect(list).toHaveFocus());
  },
};

export const NoButtonWhenItFits: Story = {
  name: 'Test · no "…" when every badge fits',
  args: { width: 720 },
  play: async ({ canvas }) => {
    for (const name of STACK) await expect(canvas.getByText(name)).toBeVisible();
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

export const Keyboard: Story = {
  name: 'Test · "…" opens with the keyboard',
  play: async ({ canvas, userEvent }) => {
    const more = await canvas.findByRole('button', { name: 'Show all 6 technologies' });
    await userEvent.tab();
    await expect(more).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('PostgreSQL')).toBeVisible();
  },
};

/** `collapse={false}`: a plain list that wraps */
export const Wraps: Story = { args: { collapse: false } };

export const NeverCollapses: Story = {
  name: 'Test · collapse={false} wraps, no "…"',
  args: { collapse: false },
  play: async ({ canvas, canvasElement }) => {
    for (const name of STACK) await expect(canvas.getByText(name)).toBeVisible();
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
    const items = Array.from(canvasElement.querySelectorAll('li'));
    await expect(new Set(items.map((item) => item.offsetTop)).size).toBeGreaterThan(1);
  },
};

export const QueryMatches: Story = {
  name: 'Test · a matching media query collapses',
  args: { collapse: '(width > 0px)' },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole('button', { name: 'Show all 6 technologies' }),
    ).toBeVisible();
  },
};

export const QueryDoesNotMatch: Story = {
  name: 'Test · a media query that does not match wraps',
  args: { collapse: '(width > 100000px)' },
  play: async ({ canvas }) => {
    for (const name of STACK) await expect(canvas.getByText(name)).toBeVisible();
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};
