import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';
import { Badge } from '@/shared/ui/badge';

import { Card, CardArrow, CardBody, CardFoot, CardMedia, CardTitle } from './Card';

/* States and sample copy follow kit sheet 04 Data display, §01 Card (the tavola) */

function TavolaCard({ disabled = false }: { disabled?: boolean }) {
  if (disabled) {
    return (
      <Card disabled>
        <CardMedia tag="Tav. VI" placeholder="[ IN LAVORAZIONE ]" aria-hidden />
        <CardBody>
          <CardTitle>Next tavola</CardTitle>
          <div className="cx-inline">
            <Badge tone="warning">Draft</Badge>
          </div>
        </CardBody>
        <CardFoot>
          <span>2027</span>
          <span>—</span>
        </CardFoot>
      </Card>
    );
  }

  return (
    <Card href="/work/multi-brand-platform">
      <CardMedia tag="Tav. I" placeholder="[ SCREEN ]" />
      <CardBody>
        <CardTitle>Multi-brand platform</CardTitle>
        <div className="cx-inline">
          <Badge tone="accent">iGaming</Badge>
          <Badge>React</Badge>
        </div>
      </CardBody>
      <CardFoot>
        <span>2025—</span>
        <CardArrow />
      </CardFoot>
    </Card>
  );
}

const meta = {
  title: 'Data display/Card',
  component: TavolaCard,
  parameters: {
    layout: 'padded',
    a11y: {
      // The dimmed media of an in-progress card is decoration (aria-hidden): the kit's opacity
      // exception (DESIGN.md §9.8) puts its text at ~2.2–2.9:1. WCAG 1.4.3 exempts purely
      // decorative text, but axe cannot tell, so that subtree is left out. Open decision in PROGRESS.md.
      context: { exclude: ['.cx-card[data-disabled] .cx-card-media'] },
    },
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <TavolaCard {...args} />
    </div>
  ),
} satisfies Meta<typeof TavolaCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Link: Story = {};

export const InProgress: Story = { args: { disabled: true } };

/** States as on the kit sheet. Hover / active / focus are forced for comparison. */
export const States: Story = {
  parameters: { ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Component"
      states={['default', 'hover', 'active', 'focus', 'disabled']}
      rows={[
        {
          name: 'Card',
          note: 'tavola',
          render: (state) => (
            <div style={{ width: 220 }}>
              <TavolaCard disabled={state === 'disabled'} />
            </div>
          ),
        },
      ]}
    />
  ),
};

export const LinksToTheCase: Story = {
  name: 'Test · the whole card is one locale-aware link',
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /Multi-brand platform/ });
    await expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('/work/multi-brand-platform'),
    );
    await expect(canvas.getByRole('heading', { name: 'Multi-brand platform' })).toBeVisible();
  },
};
