import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import clsx from 'clsx';

import styles from './foundations.module.css';

/* Follows the Foundations sheet (UI Kit · 00, §03 Space, radius, borders, elevation) and DESIGN.md §1.5, §1.8 */

const spaceScale = [
  { size: 4 },
  { size: 8 },
  { size: 12 },
  { size: 16 },
  { size: 24 },
  { size: 32 },
  { size: 48 },
  { size: 64, note: 'sections' },
  { size: 96, note: 'folio' },
];

const radii = [
  { value: '0', label: '0', note: 'sheet frame, stamp' },
  { value: 'var(--r-sm)', label: '3 · --r-sm', note: 'badge, kbd, menu item' },
  { value: 'var(--r)', label: '4 · --r', note: 'everything else' },
];

const borders = [
  { style: '1px solid var(--line)', note: '1px line · inside cards' },
  { style: '1px solid var(--line-strong)', note: '1px line-strong · inputs' },
  { style: '1px solid var(--ink)', note: '1px ink · component outlines' },
  { style: '2px solid var(--ink)', note: '2px ink · header, stamp, tables' },
  { style: '1px dashed var(--sanguine)', note: '1px dashed sanguine · constructions' },
];

const elevations = [
  { className: undefined, label: 'flat', note: 'default' },
  { className: styles.stateHover, label: 'lift', note: 'hover · --lift, 3px' },
  { className: undefined, label: 'float', note: 'menus, dialogs · --float, 4px', float: true },
  { className: styles.stateDisabled, label: 'hatch', note: 'disabled, empty · --hatch' },
];

function SpaceRadiusBordersElevation() {
  return (
    <div className={styles.page}>
      <div className="cx-cols-4">
        <section className="cx-panel cx-stack" aria-label="Space">
          <span className="cx-cap">Space · step 4</span>
          {spaceScale.map(({ size, note }) => (
            <div key={size} className="cx-inline">
              <span className={styles.spaceBar} style={{ width: size }} />
              <span className="cx-label">{note ? `${size} · ${note}` : size}</span>
            </div>
          ))}
        </section>

        <section className="cx-panel cx-stack" aria-label="Radius">
          <span className="cx-cap">Radius</span>
          {radii.map(({ value, label, note }) => (
            <div key={label} className="cx-inline">
              <span className={styles.radiusBox} style={{ borderRadius: value }} />
              <span className="cx-small">
                <b>{label}</b> · {note}
              </span>
            </div>
          ))}
          <div className="cx-inline">
            <span className={styles.radiusPill} />
            <span className="cx-small">
              <b>pill</b> · switch, chip
            </span>
          </div>
        </section>

        <section className="cx-panel cx-stack" aria-label="Borders">
          <span className="cx-cap">Borders</span>
          {borders.map(({ style, note }) => (
            <div key={note} className="cx-stack">
              <span className={styles.rule} style={{ borderTop: style }} />
              <span className="cx-small">{note}</span>
            </div>
          ))}
        </section>

        <section className="cx-panel cx-stack" aria-label="Elevation">
          <span className="cx-cap">Elevation · never blur</span>
          {elevations.map(({ className, label, note, float }) => (
            <div key={label} className="cx-inline">
              <span
                className={clsx(styles.elevationBox, className)}
                style={float ? { boxShadow: 'var(--float)' } : undefined}
              />
              <span className="cx-small">
                <b>{label}</b> · {note}
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Space & effects',
  component: SpaceRadiusBordersElevation,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SpaceRadiusBordersElevation>;

export default meta;

export const Overview: StoryObj<typeof meta> = {};
