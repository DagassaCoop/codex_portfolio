import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';

import { pseudoStateParameters, StateMatrix, type StateMatrixRow } from '@/shared/lib/storybook';
import { ArrowUpRightIcon, CopyIcon, DownloadIcon, XIcon } from '@/shared/ui/icons';

import { Button, buttonClassName, type ButtonVariant } from './Button';

/* Rows, notes and sample copy follow kit sheet 01 Actions, §01 Button */
const variants: { variant: ButtonVariant; note: string; label: string }[] = [
  { variant: 'primary', note: 'CTA · 1 per screen', label: 'View the work →' },
  { variant: 'ink', note: 'strong second action', label: 'Send message' },
  { variant: 'secondary', note: 'outline · surface', label: 'Read case' },
  { variant: 'mono', note: 'utility actions', label: 'Download CV' },
  { variant: 'ghost', note: 'no outline, no lift', label: 'Cancel' },
  { variant: 'danger', note: 'destructive', label: 'Discard draft' },
  { variant: 'link', note: 'in text and lists', label: 'All tavole →' },
];

const variantRows: StateMatrixRow[] = [
  ...variants.map(({ variant, note, label }) => ({
    name: variant[0]!.toUpperCase() + variant.slice(1),
    note,
    render: (state: string) => (
      <Button variant={variant} disabled={state === 'disabled'}>
        {label}
      </Button>
    ),
  })),
  {
    name: 'Icon',
    note: '44×44 · aria-label',
    render: (state) => (
      <>
        <Button
          variant="secondary"
          iconOnly
          aria-label="Copy email"
          disabled={state === 'disabled'}
        >
          <CopyIcon />
        </Button>
        <Button variant="ghost" iconOnly aria-label="Close" disabled={state === 'disabled'}>
          <XIcon />
        </Button>
      </>
    ),
  },
];

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: {
    variant: 'primary',
    size: 'md',
    children: 'View the work →',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ink', 'secondary', 'mono', 'ghost', 'danger', 'link'],
    },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Try every prop from the Controls panel */
export const Playground: Story = {};

/** Variants × states, as on the kit sheet. Hover / active / focus are forced for comparison. */
export const Variants: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix states={['default', 'hover', 'active', 'focus', 'disabled']} rows={variantRows} />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="cx-inline">
      <Button variant="primary">Default 44</Button>
      <Button variant="primary" size="sm">
        Small 36
      </Button>
      <Button variant="secondary" size="sm" iconOnly aria-label="Close">
        <XIcon />
      </Button>
    </div>
  ),
};

/** Leading icon for actions, trailing ↗ for external links */
export const WithIcon: Story = {
  render: () => (
    <div className="cx-inline">
      <Button variant="mono">
        <DownloadIcon />
        Download CV
      </Button>
      <a href="#" className={buttonClassName({ variant: 'secondary' })}>
        GitHub
        <ArrowUpRightIcon />
      </a>
    </div>
  ),
};

/** A link that looks like a button: use `buttonClassName` on the link, not `<Button>` */
export const AsLink: Story = {
  render: () => (
    <div className="cx-inline">
      <a href="#" className={buttonClassName({ variant: 'primary' })}>
        Open full case →
      </a>
      <a href="#" className={buttonClassName({ variant: 'link' })}>
        All tavole →
      </a>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Open full case →' })).toHaveClass(
      'cx-btn',
      'cx-btn--primary',
    );
  },
};

/** Loading: compass spinner before the label, full colour, clicks ignored (kit sheet 01 §01) */
export const Loading: Story = {
  render: () => (
    <div className="cx-inline">
      <Button variant="ink" loading>
        Sending…
      </Button>
      <Button variant="primary" loading>
        Sending…
      </Button>
    </div>
  ),
};

/* ---------- Behaviour ---------- */

export const ClickCallsHandler: Story = {
  name: 'Test · click calls onClick',
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'View the work →' });
    await expect(button).toHaveAttribute('type', 'button');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const DisabledIgnoresClick: Story = {
  name: 'Test · disabled ignores click',
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LoadingIgnoresClick: Story = {
  name: 'Test · loading ignores click, stays focusable',
  args: { loading: true, children: 'Sending…' },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Sending…' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).not.toBeDisabled(); // not :disabled, so no hatching
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};
