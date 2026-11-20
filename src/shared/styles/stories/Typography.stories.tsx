import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { expect } from 'storybook/test';

import styles from './foundations.module.css';

type SpecimenRow = {
  /** Class name and spec, as printed on the Foundations sheet */
  spec: string[];
  sample: ReactNode;
};

/* Rows and sample copy follow the Foundations sheet (UI Kit · 00, §02 Typography) */
const rows: SpecimenRow[] = [
  {
    spec: ['.cx-display · h1', 'Space Grotesk 700', '56 / 1.02 / −3.5%'],
    sample: <p className="cx-display">Interfaces like machines</p>,
  },
  {
    spec: ['.cx-h2', 'Space Grotesk 700', '32 / 1.08 / −2.5%'],
    sample: <p className="cx-h2">Fol. 02 — Selected work</p>,
  },
  {
    spec: ['.cx-h3', 'Space Grotesk 700', '22 / 1.15'],
    sample: <p className="cx-h3">Tavola III — Life Focus Tree</p>,
  },
  {
    spec: ['.cx-h4', 'Space Grotesk 600', '17 / 1.25'],
    sample: <p className="cx-h4">Problem · Approach · Result</p>,
  },
  {
    spec: ['.cx-lead', 'Hanken Grotesk 400', '20 / 1.5'],
    sample: <p className="cx-lead">Readable case studies, drawn like a notebook.</p>,
  },
  {
    spec: ['.cx-body · p', 'Hanken Grotesk 400', '17.5 / 1.56'],
    sample: (
      <p className={`cx-body ${styles.measure}`}>
        Content stays calm and readable — the drawing lives in the margins. Inline code looks like{' '}
        <code className="cx-icode">useBrandConfig()</code>, links look like{' '}
        <a className="cx-tlink" href="#">
          this case study
        </a>
        .
      </p>
    ),
  },
  {
    spec: ['.cx-small', 'Hanken Grotesk 400', '14 / 1.5'],
    sample: <p className="cx-small">Updated 2026 · 4 min read</p>,
  },
  {
    spec: ['.cx-note', 'Hanken Grotesk 400', '13 / 1.45'],
    sample: <p className="cx-note">Highlight from the keyboard looks like hover.</p>,
  },
  {
    spec: ['.cx-label', 'IBM Plex Mono 500', '12 / UPPER / +13%'],
    sample: (
      <span className="cx-label" style={{ color: 'var(--sanguine)' }}>
        Fol. 02 · 06 tavole
      </span>
    ),
  },
  {
    spec: ['.cx-cap', 'IBM Plex Mono 400', '10 / UPPER / +16%'],
    sample: <span className="cx-cap">Figure 1 · exploded view</span>,
  },
  {
    spec: ['.cx-marg + .cx-mirror', 'EB Garamond Italic', '18 · max 2 per screen'],
    sample: (
      <span className="cx-marg">
        shared logic, typed —{' '}
        <span className="cx-mirror" aria-hidden="true">
          studio di macchina
        </span>
      </span>
    ),
  },
];

function TypeScale() {
  return (
    <div className={styles.page}>
      <div className={`cx-panel ${styles.specimen}`}>
        {rows.map((row) => (
          <div key={row.spec[0]} className={styles.specimenRow}>
            <span className={`cx-cap ${styles.specimenSpec}`}>
              {row.spec.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </span>
            {row.sample}
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Typography',
  component: TypeScale,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TypeScale>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  play: async () => {
    // Every kit font is loaded (by next/font in the app, by Storybook's next/font support here)
    await document.fonts.ready;
    for (const family of ['Space Grotesk', 'Hanken Grotesk', 'IBM Plex Mono']) {
      await expect(document.fonts.check(`16px "${family}"`)).toBe(true);
    }
  },
};

/* ---------- Text link (.cx-tlink) states ---------- */

function TextLink() {
  return (
    <p className="cx-body">
      Read{' '}
      <a className="cx-tlink" href="#">
        this case study
      </a>
    </p>
  );
}

/*
 * The hover / active / focus-visible stories are frozen states for visual comparison with the kit sheets.
 * storybook-addon-pseudo-states applies them after the story renders, so they carry no style assertions;
 * the real keyboard behaviour is tested in "Text link · keyboard focus".
 */

export const LinkDefault: Story = {
  name: 'Text link · default',
  render: () => <TextLink />,
};

export const LinkHover: Story = {
  name: 'Text link · hover',
  render: () => <TextLink />,
  parameters: { pseudo: { hover: true } },
};

export const LinkActive: Story = {
  name: 'Text link · active',
  render: () => <TextLink />,
  parameters: { pseudo: { active: true } },
};

export const LinkFocusVisible: Story = {
  name: 'Text link · focus-visible',
  render: () => <TextLink />,
  parameters: { pseudo: { focusVisible: true } },
};

export const LinkKeyboardFocus: Story = {
  name: 'Text link · keyboard focus',
  render: () => <TextLink />,
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole('link');
    await userEvent.tab();

    await expect(link).toHaveFocus();
    // The shared focus rule (focus.css) draws the construction line
    await expect(getComputedStyle(link).outlineStyle).toBe('dashed');
    await expect(getComputedStyle(link).outlineColor).toBe('rgb(163, 64, 42)'); // --sanguine
  },
};
