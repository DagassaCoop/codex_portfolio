import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Badge } from '@/shared/ui/badge';

import { Item, ItemList } from './Item';

/* Rows and sample copy follow kit sheet 04 Data display, §02 Item (list mode) */

function WorkList() {
  return (
    <ItemList>
      <Item
        href="/work/multi-brand-platform"
        num="I"
        title="Multi-brand platform"
        meta={
          <>
            <Badge tone="accent">iGaming</Badge>
            <Badge>React · TS</Badge>
          </>
        }
        end="2025—"
      />
      <Item
        href="/work/life-focus-tree"
        num="II"
        title="Life Focus Tree"
        meta={<Badge>Pet project</Badge>}
        end="2026"
      />
      <Item
        href="/work/innopharma-migration"
        num="III"
        title="AngularJS → Vue migration"
        meta={<Badge>Vue · TS</Badge>}
        end="2023"
      />
      <Item
        href="/work/project"
        num="IV"
        title="[ Project ]"
        meta={<Badge>[Stack]</Badge>}
        end="2024"
      />
      <Item
        num="VI"
        title="Next tavola"
        meta={<Badge tone="warning">Draft</Badge>}
        end="2027"
        disabled
      />
    </ItemList>
  );
}

const meta = {
  title: 'Data display/Item',
  component: WorkList,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = {};

/** Rows II–IV forced to hover / active / focus, row VI in progress — as on the kit sheet */
export const States: Story = {
  parameters: {
    pseudo: {
      hover: '.cx-items > :nth-child(2)',
      active: '.cx-items > :nth-child(3)',
      focusVisible: '.cx-items > :nth-child(4)',
    },
  },
};

export const RowsAreLinks: Story = {
  name: 'Test · rows are locale-aware links, the draft is not',
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole('link');
    await expect(links).toHaveLength(4);
    await expect(links[0]).toHaveAttribute(
      'href',
      expect.stringContaining('/work/multi-brand-platform'),
    );
    await expect(canvas.getByText('Next tavola').closest('.cx-item')).toHaveAttribute(
      'data-disabled',
    );
  },
};
