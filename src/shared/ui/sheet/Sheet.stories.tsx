import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, waitFor } from 'storybook/test';

import { buttonClassName } from '@/shared/ui/button';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';
import { MenuIcon } from '@/shared/ui/icons';
import { Toggle } from '@/shared/ui/toggle';
import { ToggleGroup } from '@/shared/ui/toggle-group';

import { SheetFooter, SheetHeader, SheetNav, SheetNavLink, SheetPopup } from './Sheet';

/*
 * Follows kit sheet 05 Overlays & feedback, §04 Sheet (the mobile menu), with the app's decisions:
 * width min(320px, 82vw), EN | FR, no Contact item, no theme switch (DESIGN.md §7, §9.5).
 */

const onWorkPage = { nextjs: { appDirectory: true, navigation: { pathname: '/en/work' } } };

const meta = {
  title: 'Overlays/Sheet',
  component: Dialog,
  parameters: { layout: 'centered', ...onWorkPage },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger iconOnly aria-label="Open menu">
        <MenuIcon />
      </DialogTrigger>
      <SheetPopup aria-label="Menu">
        <SheetHeader label="Codex · Index" closeLabel="Close menu" />
        <SheetNav aria-label="Primary">
          <SheetNavLink href="/" meta="FOL. 01">
            Home
          </SheetNavLink>
          <SheetNavLink href="/work" meta="FOL. 02">
            Work
          </SheetNavLink>
          <SheetNavLink href="/about" meta="FOL. 03">
            About
          </SheetNavLink>
        </SheetNav>
        <SheetFooter>
          <ToggleGroup
            aria-label="Language"
            defaultValue={['en']}
            style={{ alignSelf: 'flex-start' }}
          >
            <Toggle value="en">EN</Toggle>
            <Toggle value="fr">FR</Toggle>
          </ToggleGroup>
          <a href="#" className={buttonClassName({ variant: 'primary' })}>
            Let’s talk
          </a>
        </SheetFooter>
      </SheetPopup>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Click the menu button: the sheet slides in from the right */
export const Playground: Story = {};

/** The mobile menu, open on the Work page: Work is the current section (sanguine) */
export const MobileMenu: Story = {
  name: 'Mobile menu · open on Work',
  args: { defaultOpen: true },
};

/** Hover on About, as on the kit sheet */
export const HoverRow: Story = {
  name: 'Mobile menu · hover on About',
  args: { defaultOpen: true },
  parameters: { pseudo: { hover: '.cx-sheet-nav a[href="/en/about"]' } },
};

export const KeyboardAndCurrent: Story = {
  name: 'Test · current section, Esc closes and returns focus',
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Open menu' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    // The sheet renders in a portal, outside the story root
    const sheet = await screen.findByRole('dialog', { name: 'Menu' });
    await expect(sheet).toHaveClass('cx-sheet-panel');

    const work = screen.getByRole('link', { name: 'Work' });
    await expect(work).toHaveAttribute('aria-current', 'page');
    await expect(work).toHaveAttribute('href', '/en/work');
    await expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};
