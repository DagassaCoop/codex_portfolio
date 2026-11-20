import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, screen, waitFor } from 'storybook/test';

import { CopyIcon } from '@/shared/ui/icons';
import { Kbd } from '@/shared/ui/kbd';

import {
  Menu,
  MenuCheckboxItem,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from './Menu';

/*
 * Follows kit sheet 03 Navigation, §05 Dropdown and §06 Context menu. Language is EN | FR
 * (DESIGN.md §9.1); the sheet's "Sheet / Notte" group is not used (one theme).
 */

function LanguageMenu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [locale, setLocale] = useState('en');

  return (
    <Menu defaultOpen={defaultOpen}>
      {/* The accessible name must contain the visible text (WCAG 2.5.3): "Language: EN" */}
      <MenuTrigger aria-label={`Language: ${locale.toUpperCase()}`}>
        {locale.toUpperCase()}
      </MenuTrigger>
      <MenuPopup>
        <MenuRadioGroup label="Language" value={locale} onValueChange={setLocale}>
          <MenuRadioItem value="en" end="EN">
            English
          </MenuRadioItem>
          <MenuRadioItem value="fr" end="FR">
            Français
          </MenuRadioItem>
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
}

/** The drawing's menu from the sheet (§06): every kind of item */
function DrawingMenu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [mirror, setMirror] = useState(true);

  return (
    <Menu defaultOpen={defaultOpen}>
      <MenuTrigger variant="secondary">Drawing</MenuTrigger>
      <MenuPopup>
        <MenuItem end={<Kbd>E</Kbd>}>Explode view</MenuItem>
        <MenuItem end={<Kbd>G</Kbd>}>Show construction lines</MenuItem>
        <MenuCheckboxItem checked={mirror} onCheckedChange={setMirror}>
          Mirror writing
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuItem
          icon={<CopyIcon />}
          end={
            <>
              <Kbd>⌘</Kbd>
              <Kbd>C</Kbd>
            </>
          }
        >
          Copy SVG
        </MenuItem>
        <MenuItem disabled>High contrast</MenuItem>
        <MenuItem danger>Reset sketch</MenuItem>
      </MenuPopup>
    </Menu>
  );
}

const meta = {
  title: 'Navigation/Menu',
  component: LanguageMenu,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Language: Story = {};

/** While the menu is open, the trigger keeps the hover look: lifted with a hard shadow */
export const LanguageOpen: Story = {
  name: 'Language · open',
  args: { defaultOpen: true },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /Language/ });
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // translate(-2px, -2px) once the 220ms settle is over
    await waitFor(() =>
      expect(getComputedStyle(trigger).transform).toBe('matrix(1, 0, 0, 1, -2, -2)'),
    );
    await expect(getComputedStyle(trigger).boxShadow).not.toBe('none');
  },
};

export const AllItemKinds: Story = {
  name: 'Drawing · all item kinds',
  render: () => <DrawingMenu defaultOpen />,
};

/* ---------- Behaviour ---------- */

export const KeyboardChoose: Story = {
  name: 'Test · open with keyboard, choose, Esc returns focus',
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /Language/ });
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    // The menu renders in a portal, outside the story root
    const menu = await screen.findByRole('menu');
    await expect(menu).toHaveClass('cx-menu');
    await expect(screen.getByRole('menuitemradio', { name: /English/ })).toHaveAttribute(
      'aria-checked',
      'true',
    );

    await userEvent.click(screen.getByRole('menuitemradio', { name: /Français/ }));
    await waitFor(() => expect(trigger).toHaveTextContent('FR'));

    await userEvent.click(trigger);
    await screen.findByRole('menu');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const CheckboxItemToggles: Story = {
  name: 'Test · checkbox item toggles',
  render: () => <DrawingMenu />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Drawing/ }));
    const mirror = await screen.findByRole('menuitemcheckbox', { name: 'Mirror writing' });
    await expect(mirror).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(mirror);

    await userEvent.click(canvas.getByRole('button', { name: /Drawing/ }));
    await expect(
      await screen.findByRole('menuitemcheckbox', { name: 'Mirror writing' }),
    ).toHaveAttribute('aria-checked', 'false');
  },
};
