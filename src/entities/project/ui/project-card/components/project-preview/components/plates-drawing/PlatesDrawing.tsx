import styles from './PlatesDrawing.module.css';

/** Tav. I preview (Home page design): three stacked plates, the brands, the kit and the core */
export function PlatesDrawing() {
  return (
    <svg viewBox="0 0 240 150" className={styles.svg}>
      <g className={styles.plate}>
        <polygon points="50,98 150,98 180,120 80,120" />
        <polygon points="50,66 150,66 180,88 80,88" />
        <polygon points="50,34 150,34 180,56 80,56" />
      </g>
      <path d="M50 34V98M150 34V98M80 56V120M180 56V120" className={styles.hidden} />
      <path
        d="M62 40l6 10M78 40l6 10M94 40l6 10M110 40l6 10M126 40l6 10"
        className={styles.slots}
      />
      <path d="M168 45H206M168 77H206M168 109H206" className={styles.leader} />
      <g className={styles.label}>
        <text x="208" y="47">
          ×5
        </text>
        <text x="208" y="79">
          KIT
        </text>
        <text x="208" y="111">
          CORE
        </text>
      </g>
    </svg>
  );
}
