import type { ReactNode } from 'react';

import styles from './StateMatrix.module.css';

/**
 * The kit's frozen interaction states. "hover", "active" and "focus" are forced by
 * storybook-addon-pseudo-states (see `pseudoStateParameters`); the others are real component props.
 */
export type KitState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'on';

const stateLabels: Record<KitState, string> = {
  default: 'Default',
  hover: 'Hover',
  active: 'Active',
  focus: 'Focus-visible',
  disabled: 'Disabled',
  on: 'On',
};

export type StateMatrixRow = {
  name: string;
  note?: string;
  /** Renders the component for one column. Use the state to set props such as `disabled`. */
  render: (state: KitState) => ReactNode;
};

type StateMatrixProps = {
  /** Columns, left to right */
  states: KitState[];
  rows: StateMatrixRow[];
  /** Header of the first column */
  label?: string;
};

/**
 * A "variant × state" table, laid out like the matrices on the kit sheets.
 * Each cell carries `data-kit-state`, which `pseudoStateParameters` uses to force the pseudo-class.
 */
export function StateMatrix({ states, rows, label = 'Variant' }: StateMatrixProps) {
  return (
    <div
      className={styles.matrix}
      style={{ gridTemplateColumns: `170px repeat(${states.length}, minmax(0, 1fr))` }}
    >
      <div className={styles.head}>{label}</div>
      {states.map((state) => (
        <div key={state} className={styles.head}>
          {stateLabels[state]}
        </div>
      ))}

      {rows.map((row) => (
        <div key={row.name} className={styles.row}>
          <div className={styles.name}>
            {row.name}
            {row.note && <span>{row.note}</span>}
          </div>
          {states.map((state) => (
            <div key={state} className={styles.cell} data-kit-state={state}>
              {row.render(state)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Story parameters that force :hover / :active / :focus-visible inside the matching matrix cells.
 * Spread into a story's or meta's `parameters`.
 */
export const pseudoStateParameters = {
  pseudo: {
    hover: '[data-kit-state="hover"] *',
    active: '[data-kit-state="active"] *',
    focusVisible: '[data-kit-state="focus"] *',
  },
};
