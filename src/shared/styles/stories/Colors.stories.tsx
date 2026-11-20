import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { expect } from 'storybook/test';

import styles from './foundations.module.css';
import { readToken } from './readToken';

type Token = `--${string}`;

type ColorToken = {
  token: Token;
  note: string;
  /** Light colours get an ink outline so they stay visible on paper */
  outlined?: boolean;
  /** Semantic pigments show their wash as an inner ring */
  wash?: Token;
};

type ColorGroup = { title: string; colors: ColorToken[] };

/* Groups and notes follow the Foundations sheet (UI Kit · 00, §01 Color) and DESIGN.md §1.1–1.4 */
const groups: ColorGroup[] = [
  {
    title: 'Surfaces',
    colors: [
      { token: '--paper', note: 'page background', outlined: true },
      { token: '--surface', note: 'cards, panels', outlined: true },
      { token: '--white', note: 'input fields', outlined: true },
      { token: '--sunk', note: 'hover', outlined: true },
      { token: '--sunk-2', note: 'active', outlined: true },
    ],
  },
  {
    title: 'Ink & lines',
    colors: [
      { token: '--ink', note: 'text, outlines' },
      { token: '--ink-2', note: 'body text' },
      { token: '--muted', note: 'captions (4.8:1)' },
      { token: '--line-strong', note: 'input borders (3.6:1)' },
      { token: '--line', note: 'dividers' },
    ],
  },
  {
    title: 'Accent · sanguine',
    colors: [
      { token: '--sanguine', note: 'default' },
      { token: '--sanguine-hover', note: 'hover' },
      { token: '--sanguine-press', note: 'press' },
      { token: '--sanguine-wash', note: 'highlight' },
      { token: '--sepia', note: 'decor only' },
    ],
  },
  {
    title: 'Semantic · pigments',
    colors: [
      { token: '--verdigris', note: 'success', wash: '--verdigris-wash' },
      { token: '--ochre', note: 'warning', wash: '--ochre-wash' },
      { token: '--error', note: 'errors', wash: '--error-wash' },
      { token: '--scrim', note: 'overlay backdrop' },
    ],
  },
];

function Swatch({ token, note, outlined, wash }: ColorToken) {
  const style = { background: `var(${token})`, '--wash': wash && `var(${wash})` } as CSSProperties;

  return (
    <div className={styles.swatchRow}>
      <span
        className={clsx(
          styles.swatch,
          outlined && styles.swatchOutlined,
          wash && styles.swatchWithWash,
        )}
        style={style}
      />
      <span className="cx-small">
        <b>{token.slice(2)}</b> {readToken(token)} · {note}
      </span>
    </div>
  );
}

function ColorPalette() {
  return (
    <div className={styles.page}>
      <div className="cx-cols-4">
        {groups.map((group) => (
          <section key={group.title} className="cx-panel cx-stack" aria-label={group.title}>
            <span className="cx-cap">{group.title}</span>
            {group.colors.map((color) => (
              <Swatch key={color.token} {...color} />
            ))}
            {group.title.startsWith('Semantic') && (
              <p className="cx-note">
                Error is darker and cooler than sanguine, and always comes with an icon and the “ERR
                —” prefix, so it is never confused with the accent.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: ColorPalette,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorPalette>;

export default meta;

export const Palette: StoryObj<typeof meta> = {
  play: async ({ canvas }) => {
    // tokens.css is loaded: the swatch labels show real values, not empty strings
    await expect(canvas.getByText(/#F1EADB/i)).toBeVisible();
    await expect(canvas.getByText(/#A3402A/i)).toBeVisible();
  },
};
