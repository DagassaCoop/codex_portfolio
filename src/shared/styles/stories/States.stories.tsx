import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import clsx from 'clsx';

import styles from './foundations.module.css';

/* Follows the Foundations sheet (UI Kit · 00, §04 State language) and DESIGN.md §2 */

const states = [
  {
    name: 'Default',
    className: undefined,
    note: 'A flat sheet with a 1px ink outline.',
  },
  {
    name: 'Hover — lift',
    className: styles.stateHover,
    note: 'Shift −2/−2 and a hard 3px shadow. Flat elements (menu items, rows) get only the sunk fill.',
  },
  {
    name: 'Active — press',
    className: styles.stateActive,
    note: 'Shift +1/+1, no shadow, sunk-2 fill (filled elements go one tone darker).',
  },
  {
    name: 'Focus-visible',
    className: styles.stateFocus,
    note: 'Construction line: 2px dashed sanguine, 3px offset. Keyboard only.',
  },
  {
    name: 'Disabled',
    className: styles.stateDisabled,
    note: 'Hatching, line border, muted text. No opacity — text stays readable.',
  },
];

function StateLanguage() {
  return (
    <div className={styles.page}>
      <div className={clsx('cx-panel', styles.states)}>
        {states.map((state) => (
          <div key={state.name} className="cx-stack">
            <span className="cx-cap">{state.name}</span>
            <span className={clsx(styles.stateDemo, state.className)} />
            <p className="cx-note">{state.note}</p>
          </div>
        ))}
      </div>

      <div className="cx-cols-3">
        <section className="cx-panel cx-stack" aria-label="Selected, on, current">
          <span className="cx-cap">Selected / on / current</span>
          <span className="cx-small">
            Ink fill with paper text. Tabs and navigation: a 2–3px sanguine bar at the bottom.
          </span>
        </section>
        <section className="cx-panel cx-stack" aria-label="Open">
          <span className="cx-cap">Open (menu, accordion)</span>
          <span className="cx-small">
            Trigger in ink fill or its number in sanguine; the chevron turns 180°, “+” becomes “−”.
          </span>
        </section>
        <section className="cx-panel cx-stack" aria-label="Motion">
          <span className="cx-cap">Motion</span>
          <span className="cx-small">
            <b>Buttons</b> (Button, Toggle, Chip, Pagination, Switch) settle into a state in{' '}
            <b>220 ms</b> cubic-bezier(.25, .8, .25, 1); the press is quick, <b>90 ms</b>.
            Everything else: <b>120 ms</b>. <code className="cx-icode">prefers-reduced-motion</code>{' '}
            turns shifts and animations off.
          </span>
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/State language',
  component: StateLanguage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StateLanguage>;

export default meta;

export const Overview: StoryObj<typeof meta> = {};
