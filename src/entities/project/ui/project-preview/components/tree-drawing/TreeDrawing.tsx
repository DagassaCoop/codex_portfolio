import { useId } from 'react';

import styles from './TreeDrawing.module.css';

/** Branch ends: the four main branches, then the seeds; one seed is hatched (not grown yet) */
const BRANCHES = [
  [148, 75],
  [120, 103],
  [92, 75],
  [120, 47],
] as const;
const SEEDS = [
  [174, 75],
  [158, 113],
  [120, 129],
  [82, 113],
  [66, 75],
  [82, 37],
  [120, 21],
  [158, 37],
] as const;
const HATCHED_SEED = '82 113';

/** Tav. II preview (Home page design): a radial tree growing from one root, "Life" */
export function TreeDrawing() {
  const hatch = `${useId()}-hatch`;

  return (
    <svg viewBox="0 0 240 150" className={styles.svg}>
      <defs>
        <pattern
          id={hatch}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="5" className={styles.hatchLine} />
        </pattern>
      </defs>
      <g className={styles.orbit}>
        <circle cx="120" cy="75" r="28" />
        <circle cx="120" cy="75" r="54" />
      </g>
      <path
        d="M120 75H148M120 75V103M120 75H92M120 75V47M148 75L174 75M148 75L158 113M120 103L120 129M120 103L82 113M92 75L66 75M92 75L82 37M120 47L120 21M120 47L158 37"
        className={styles.branch}
      />
      <g className={styles.node}>
        {BRANCHES.map(([cx, cy]) => (
          <circle key={`${cx} ${cy}`} cx={cx} cy={cy} r="4" />
        ))}
        {SEEDS.map(([cx, cy]) => (
          <circle
            key={`${cx} ${cy}`}
            cx={cx}
            cy={cy}
            r="3.5"
            fill={`${cx} ${cy}` === HATCHED_SEED ? `url(#${hatch})` : undefined}
          />
        ))}
      </g>
      <circle cx="120" cy="75" r="7" className={styles.root} />
      <text x="132" y="68" className={styles.label}>
        LIFE
      </text>
    </svg>
  );
}
