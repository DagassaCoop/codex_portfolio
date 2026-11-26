import clsx from 'clsx';
import type { Ref } from 'react';

import styles from './ContentsPage.module.css';

export type ContentsEntry = {
  /** "Project II" */
  tag: string;
  title: string;
  /** Where the project's spread starts: "fol. 3v" (decor) */
  folio: string;
};

type ContentsPageProps = {
  /** "Contents", "Projects I — VII" */
  label: string;
  range: string;
  /** The marginal note at the bottom (decor) */
  note: string;
  entries: ContentsEntry[];
  /** Opens the project's spread: its index in `entries` */
  onOpen: (index: number) => void;
  /** The first entry, focused when the notebook turns back to the contents */
  firstEntryRef?: Ref<HTMLButtonElement>;
};

/**
 * The contents, the notebook's first left page (Projects page design, Fol. 02.1): one row per
 * project — "Project II", the title, a dotted leader and the folio — each a button that turns to
 * its spread. The rows use the kit's menu item look; outside a menu they keep the dashed focus line.
 */
export function ContentsPage({
  label,
  range,
  note,
  entries,
  onOpen,
  firstEntryRef,
}: ContentsPageProps) {
  return (
    <>
      <div className={styles.head}>
        <span className={clsx('cx-label', styles.label)}>{label}</span>
        <span className="cx-cap">{range}</span>
      </div>
      <ol className={styles.list}>
        {entries.map((entry, index) => (
          <li key={entry.tag}>
            <button
              ref={index === 0 ? firstEntryRef : undefined}
              type="button"
              className={clsx('cx-menu-item', styles.entry)}
              onClick={() => onOpen(index)}
            >
              <span className={clsx('cx-label', styles.tag)}>{entry.tag}</span>
              <span className={styles.title}>{entry.title}</span>
              <span aria-hidden="true" className={styles.leader} />
              <span aria-hidden="true" className={clsx('cx-cap', styles.folio)}>
                {entry.folio}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <span aria-hidden="true" className={clsx('cx-marg', styles.note)}>
        {note}
      </span>
    </>
  );
}
