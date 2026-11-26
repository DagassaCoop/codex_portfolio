import clsx from 'clsx';
import type { Ref } from 'react';

import styles from './SliderContents.module.css';

export type SliderContentsEntry = {
  /** "II" */
  id: string;
  title: string;
};

type SliderContentsProps = {
  /** "Contents", "Projects I — VII", "All projects" */
  label: string;
  range: string;
  title: string;
  entries: SliderContentsEntry[];
  /** Opens the project's page: its index in `entries` */
  onOpen: (index: number) => void;
  /** The first entry, focused when the notebook goes back to the contents */
  firstEntryRef?: Ref<HTMLButtonElement>;
};

/**
 * The contents, the notebook's first page on tablets and phones (Projects page design, "pad"):
 * the head, "All projects", then one row per project — the numeral, the title, a dotted leader
 * and → — each a button that slides to the project's page. Rows spread over the page's height.
 */
export function SliderContents({
  label,
  range,
  title,
  entries,
  onOpen,
  firstEntryRef,
}: SliderContentsProps) {
  return (
    <>
      <div className={styles.head}>
        <span className={clsx('cx-label', styles.label)}>{label}</span>
        <span className="cx-cap">{range}</span>
      </div>
      <h3 className={clsx('cx-h2', styles.title)}>{title}</h3>
      <ol className={styles.list}>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <button
              ref={index === 0 ? firstEntryRef : undefined}
              type="button"
              className={clsx('cx-menu-item', styles.entry)}
              onClick={() => onOpen(index)}
            >
              <span className={clsx('cx-label', styles.num)}>{entry.id}</span>
              <span className={styles.entryTitle}>{entry.title}</span>
              <span aria-hidden="true" className={styles.leader} />
              <span aria-hidden="true" className={styles.arrow}>
                →
              </span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
