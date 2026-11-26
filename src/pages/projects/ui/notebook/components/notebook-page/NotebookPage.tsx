'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

import styles from './NotebookPage.module.css';

export type NotebookPageSide = 'left' | 'right';

type NotebookPageProps = {
  /** Which side of the spine the page lies on: the gutter's hatching and the folio follow it */
  side: NotebookPageSide;
  /** "fol. 3v" (decor) */
  folio: string;
  children: ReactNode;
  className?: string;
};

/**
 * One page of the notebook (Projects page design, Fol. 02.1): ruled surface paper, the hatched
 * gutter by the spine, the folio at the bottom outer corner. It fills its slot in the spread; when
 * its content is taller than the page (a short window), the content scrolls inside the page and
 * takes keyboard focus.
 */
export function NotebookPage({ side, folio, children, className }: NotebookPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollable = useScrollable(contentRef);

  return (
    <div className={clsx(styles.page, styles[side], className)}>
      <span aria-hidden="true" className={styles.gutter} />
      <div
        ref={contentRef}
        // A page that scrolls can be scrolled with the keyboard too (Safari does not focus scrollers)
        tabIndex={scrollable ? 0 : undefined}
        className={styles.content}
      >
        {children}
      </div>
      <span aria-hidden="true" className={clsx('cx-cap', styles.folio)}>
        {folio}
      </span>
    </div>
  );
}

/** Whether the element's content is taller than the element, kept up to date as it resizes */
function useScrollable(ref: RefObject<HTMLElement | null>) {
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setScrollable(element.scrollHeight > element.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return scrollable;
}
