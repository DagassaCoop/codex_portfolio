import clsx from 'clsx';

import styles from './Stats.module.css';

export type StatsItem = {
  key: string;
  /** "07" */
  value: string;
  /** "Tavole" */
  label: string;
  /** The value in sanguine (the design marks the last one) */
  accent?: boolean;
};

type StatsProps = {
  /** Names the list for screen readers: "In numbers" */
  label: string;
  items: StatsItem[];
  className?: string;
};

/**
 * The numbers under the intro (Projects page design): a surface strip of cells, each a large value
 * over its caption; four in a row, two on phones.
 *
 * A description list: the caption is the term, the value its description; the value is drawn first.
 */
export function Stats({ label, items, className }: StatsProps) {
  return (
    <dl aria-label={label} className={clsx(styles.stats, className)}>
      {items.map(({ key, value, label: caption, accent }) => (
        <div key={key} className={styles.cell}>
          <dt className="cx-cap">{caption}</dt>
          <dd className={clsx(styles.value, accent && styles.accent)}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
