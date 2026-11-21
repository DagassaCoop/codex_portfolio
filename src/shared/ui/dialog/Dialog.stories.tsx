import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, waitFor, within } from 'storybook/test';

import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { Badge } from '@/shared/ui/badge';
import { buttonClassName } from '@/shared/ui/button';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTrigger,
} from './Dialog';

/* Follows kit sheet 05 Overlays & feedback, §03 Dialog (the tavola preview). Copy is sample copy. */

const meta = {
  title: 'Overlays/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>Preview Tav. I</DialogTrigger>
      <DialogPopup width={620}>
        <DialogHeader label="Fol. 02 · Tav. I" title="Multi-brand platform" closeLabel="Close" />
        <DialogBody>
          <AspectRatio ratio={16 / 7} label="Screen 01" />
          <DialogDescription className="cx-small">
            Shared business logic and a UI Kit library in one monorepo; each product is a thin app
            template on top.
          </DialogDescription>
          <div className="cx-inline" style={{ gap: 6 }}>
            <Badge tone="accent">iGaming</Badge>
            <Badge>React</Badge>
            <Badge>TypeScript</Badge>
            <Badge>Monorepo</Badge>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
          <a href="#" className={buttonClassName({ variant: 'primary' })}>
            Open full case →
          </a>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Click the button: the dialog is laid down over the scrim */
export const Playground: Story = {};

/** Open, as on the kit sheet: label, title, close button, body, sunk footer */
export const TavolaPreview: Story = {
  name: 'Tavola preview · open',
  args: { defaultOpen: true },
};

/** The default width (480) without a label */
export const Default: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogPopup>
        <DialogHeader title="Reset the form?" closeLabel="Close" />
        <DialogBody>
          <DialogDescription className="cx-small">
            The name, email and message you typed will be cleared.
          </DialogDescription>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Keep</DialogClose>
          <DialogClose variant="ink">Reset</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
};

export const KeyboardAndFocus: Story = {
  name: 'Test · opens from the keyboard, traps focus, Esc returns focus',
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Preview Tav. I' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    // The dialog renders in a portal, outside the story root
    const dialog = await screen.findByRole('dialog', { name: 'Multi-brand platform' });
    await expect(dialog).toHaveClass('cx-dialog');
    await expect(dialog).toHaveAccessibleDescription(/Shared business logic/);
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const CloseButtons: Story = {
  name: 'Test · the close icon and Close in the footer both close it',
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Preview Tav. I' });

    // The head's icon button and the footer's Ghost button are both named "Close"
    for (const index of [0, 1]) {
      await userEvent.click(trigger);
      const dialog = await screen.findByRole('dialog');
      const [icon, footer] = within(dialog).getAllByRole('button', { name: 'Close' });
      await userEvent.click(index === 0 ? icon! : footer!);
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    }
  },
};
