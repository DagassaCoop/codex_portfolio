import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';
import { Badge } from '@/shared/ui/badge';
import { BadgeList } from '@/shared/ui/badge-list';

import { Card, CardArrow, CardBody, CardFoot, CardMedia, CardTitle, type CardLayout } from './Card';

/* States and sample copy follow kit sheet 04 Data display, §01 Card (the tavola) */

type TavolaCardProps = {
  disabled?: boolean;
  /** With the domain caption over the media (Home design) */
  caption?: boolean;
  layout?: CardLayout;
};

function TavolaCard({ disabled = false, caption = false, layout }: TavolaCardProps) {
  if (disabled) {
    return (
      <Card disabled layout={layout}>
        <CardMedia tag="TAV. VI" placeholder="[ IN LAVORAZIONE ]" aria-hidden />
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
    <Card href="/work/multi-brand-platform" layout={layout}>
      <CardMedia tag="TAV. I" placeholder="[ SCREEN ]" caption={caption ? 'IGAMING' : undefined} />
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

/** The project's domain over the media, bottom left (Home design) */
export const WithCaption: Story = { args: { caption: true } };

/**
 * `layout="adaptive"`: lies sideways on tablets (601–1024px), upright elsewhere.
 * Switch the viewport to a tablet to see it.
 */
export const Adaptive: Story = {
  args: { layout: 'adaptive', caption: true },
  render: (args) => (
    <div style={{ maxWidth: 720 }}>
      <TavolaCard {...args} />
    </div>
  ),
};

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

/**
 * `link="title"`: the title's link stretches over the card, so the card can hold its own buttons,
 * here the stack's "…" (Badge list). It looks and reacts like the link card.
 */
export const TitleLink: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Card link="title">
        <CardMedia tag="TAV. II" placeholder="[ SCREEN ]" caption="PERSONAL PRODUCTIVITY" />
        <CardBody>
          <CardTitle href="/work/life-focus-tree">Life Focus Tree</CardTitle>
          <BadgeList moreLabel="Show all 5 technologies">
            {['Next.js', 'TypeScript', 'd3-hierarchy', 'GraphQL', 'Prisma'].map((name) => (
              <Badge key={name}>{name}</Badge>
            ))}
          </BadgeList>
        </CardBody>
        <CardFoot>
          <span>2026 · PERSONAL</span>
          <CardArrow />
        </CardFoot>
      </Card>
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    // One link, named by the title alone, covering the card
    const link = canvas.getByRole('link', { name: 'Life Focus Tree' });
    await expect(link).toHaveAttribute('href', expect.stringContaining('/work/life-focus-tree'));
    const card = canvasElement.querySelector('.cx-card');
    const media = canvasElement.querySelector('.cx-card-media');
    if (!card || !media) throw new Error('card not rendered');
    const point = media.getBoundingClientRect();
    await expect(document.elementFromPoint(point.x + 40, point.y + 40)).toBe(link);

    // The "…" sits above the stretched link and opens the stack
    const more = await canvas.findByRole('button', { name: 'Show all 5 technologies' });
    const box = more.getBoundingClientRect();
    await expect(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)).toBe(
      more,
    );
    await userEvent.click(more);
    await expect(canvas.getByText('Prisma')).toBeVisible();

    // Keyboard focus on the link draws the construction line around the card
    link.focus();
    await expect(getComputedStyle(card).outlineStyle).toBe('dashed');
  },
};
