import { useId } from 'react';

import styles from './MigrationDrawing.module.css';

/** Tav. III preview (Home page design): a hatched AngularJS block becomes a Vue + TS block */
export function MigrationDrawing() {
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
      <rect
        x="28"
        y="40"
        width="64"
        height="60"
        rx="2"
        fill={`url(#${hatch})`}
        className={styles.block}
      />
      <rect
        x="148"
        y="40"
        width="64"
        height="60"
        rx="2"
        className={`${styles.block} ${styles.surface}`}
      />
      <path d="M162 54l18 32 18-32" className={styles.vue} />
      <path d="M100 70H138M132 64l7 6-7 6" className={styles.arrow} />
      <path d="M28 116H212M28 112v8M212 112v8" className={styles.dimension} />
      <g className={styles.label} textAnchor="middle">
        <text x="60" y="34">
          ANGULARJS
        </text>
        <text x="180" y="34">
          VUE + TS
        </text>
        <text x="120" y="130">
          +27% PERFORMANCE
        </text>
      </g>
    </svg>
  );
}
