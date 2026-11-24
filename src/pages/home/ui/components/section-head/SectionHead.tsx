import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './SectionHead.module.css';

type SectionHeadProps = {
  /** "Fol. 02" */
  folio: ReactNode;
  /** The sheet label under the folio: "Work · Tav. I — III of III" */
  sheet: ReactNode;
  /** The section's h2; its id names the section (`aria-labelledby`) */
  title: ReactNode;
  titleId: string;
  /** On the right, e.g. "All work"; the title takes its columns when there is none */
  action?: ReactNode;
};

/**
 * A Home section's head (Home page design, sections 1.2–1.4): the folio and the sheet label in
 * columns 1–3, the h2 from column 4, an optional action at the end. One column on tablets.
 */
export function SectionHead({ folio, sheet, title, titleId, action }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <div className={styles.folio}>
        <span className={clsx('cx-label', styles.folioNumber)}>{folio}</span>
        <span className="cx-cap">{sheet}</span>
      </div>
      <h2 id={titleId} className={clsx('cx-h2', styles.title, action == null && styles.wide)}>
        {title}
      </h2>
      {action != null && <div className={styles.action}>{action}</div>}
    </div>
  );
}
