'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/ui/icons';

import { ContentsPage, type ContentsEntry } from './components/contents-page';
import styles from './NotebookSpread.module.css';
import { NotebookPage } from '../notebook-page';

/** One spread: the left page's content (null on the first: the contents), the right page's */
export type Spread = {
  left: ReactNode;
  right: ReactNode;
  leftFolio: string;
  rightFolio: string;
  /** The right page's h3, focused when a spread is opened from the contents */
  headingId: string;
  /** "Project II of VII · fol. 3v — 4r" */
  counter: string;
  /** Read out once the page has turned: "Spread 3 of 8: Project II, Life Focus Tree" */
  announcement: string;
};

type NotebookSpreadProps = {
  /** Spread 0 is the contents and the title page, then one per project */
  spreads: Spread[];
  contents: { label: string; range: string; note: string; entries: ContentsEntry[] };
  labels: { controls: string; prev: string; next: string; contents: string };
};

type Turn = { from: number; to: number; phase: 0 | 1 };

/** How long a leaf takes to turn (Projects page design); the fallback waits a little longer */
const TURN_MS = 820;

/** What gets focus once the page has turned */
type FocusTarget = 'heading' | 'contents' | 'prev' | 'next' | null;

/**
 * The notebook on desktops (Projects page design, Fol. 02.1, "spread"): two pages side by side
 * with the spine between them; Prev / Next, the counter and Contents under the book.
 *
 * A turn lays a leaf over the right half (next) or the left half (prev) and rotates it 180° about
 * the spine: its front is the page being turned away, its back the page it uncovers. With reduced
 * motion the spread changes at once.
 *
 * The book is 800px tall, or less on a short window (with its controls, at most 90% of the window's
 * height); a page whose content does not fit scrolls inside. Every page sits in its side's cell at
 * once, the others hidden, so switching spreads only changes what is visible.
 */
export function NotebookSpread({ spreads, contents, labels }: NotebookSpreadProps) {
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const focusTarget = useRef<FocusTarget>(null);
  const firstEntryRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const fallback = useRef<ReturnType<typeof setTimeout>>(undefined);

  const last = spreads.length - 1;

  const turnTo = (to: number, focus: FocusTarget) => {
    if (turn || to === page || to < 0 || to > last) return;
    focusTarget.current = focus;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPage(to);
      return;
    }

    setTurn({ from: page, to, phase: 0 });
    // Paint the leaf flat first, then let it turn
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setTurn((current) => current && { ...current, phase: 1 })),
    );
    clearTimeout(fallback.current);
    fallback.current = setTimeout(() => finish(to), TURN_MS + 200);
  };

  const finish = (to: number) => {
    clearTimeout(fallback.current);
    setPage(to);
    setTurn(null);
  };

  useEffect(() => () => clearTimeout(fallback.current), []);

  // Once the spread has changed, move focus where the reader expects it
  useEffect(() => {
    const target = focusTarget.current;
    focusTarget.current = null;
    if (target === 'heading') {
      document.getElementById(spreads[page]?.headingId ?? '')?.focus();
    } else if (target === 'contents') {
      firstEntryRef.current?.focus();
    } else if (target === 'next' && page === last) {
      // The button just pressed is now disabled and has lost focus: hand it to the other one
      prevRef.current?.focus();
    } else if (target === 'prev' && page === 0) {
      nextRef.current?.focus();
    }
  }, [page, last, spreads]);

  const target = turn ? turn.to : page;
  const forward = turn ? turn.to > turn.from : true;

  // Which spread each half shows; while turning, the leaf covers the page being turned away
  const leftIndex = turn ? (forward ? turn.from : turn.to) : page;
  const rightIndex = turn ? (forward ? turn.to : turn.from) : page;
  const leafFront = turn ? (forward ? turn.from : turn.to) : page;
  const leafBack = turn ? (forward ? turn.to : turn.from) : page;
  const leafAngle = turn ? (forward === (turn.phase === 1) ? -180 : 0) : 0;

  const renderLeft = (index: number) => (
    <NotebookPage side="left" folio={spreads[index]!.leftFolio}>
      {index === 0 ? (
        <ContentsPage
          {...contents}
          onOpen={(entry) => turnTo(entry + 1, 'heading')}
          firstEntryRef={firstEntryRef}
        />
      ) : (
        spreads[index]!.left
      )}
    </NotebookPage>
  );

  const renderRight = (index: number) => (
    <NotebookPage side="right" folio={spreads[index]!.rightFolio}>
      {spreads[index]!.right}
    </NotebookPage>
  );

  return (
    <div className={styles.notebook}>
      <span aria-live="polite" className={styles.srOnly}>
        {turn ? '' : spreads[page]!.announcement}
      </span>

      <div className={styles.book}>
        <div aria-hidden="true" className={clsx(styles.edge, styles.edgeBack)} />
        <div aria-hidden="true" className={clsx(styles.edge, styles.edgeFront)} />

        <div className={styles.spread}>
          <div className={clsx(styles.half, styles.left)}>
            {spreads.map((_, index) => (
              <div
                key={index}
                className={styles.slot}
                data-current={index === leftIndex || undefined}
              >
                {renderLeft(index)}
              </div>
            ))}
          </div>
          <div className={clsx(styles.half, styles.right)}>
            {spreads.map((_, index) => (
              <div
                key={index}
                className={styles.slot}
                data-current={index === rightIndex || undefined}
              >
                {renderRight(index)}
              </div>
            ))}
          </div>

          <div aria-hidden="true" className={styles.spine} />
          <div aria-hidden="true" className={styles.stitches} />

          {turn && (
            <div
              aria-hidden="true"
              inert
              className={clsx(styles.leaf, turn.phase === 1 && styles.turning)}
              style={{ transform: `rotateY(${leafAngle}deg)` }}
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget && turn.phase === 1) finish(turn.to);
              }}
            >
              <div className={clsx(styles.face, styles.front)}>{renderRight(leafFront)}</div>
              <div className={clsx(styles.face, styles.back)}>{renderLeft(leafBack)}</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <ButtonGroup aria-label={labels.controls}>
          <Button
            ref={prevRef}
            variant="secondary"
            disabled={target === 0}
            onClick={() => turnTo(target - 1, 'prev')}
          >
            <ArrowLeftIcon />
            {labels.prev}
          </Button>
          <Button
            ref={nextRef}
            variant="secondary"
            disabled={target === last}
            onClick={() => turnTo(target + 1, 'next')}
          >
            {labels.next}
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
        <div className={styles.status}>
          <span className={clsx('cx-label', styles.counter)}>{spreads[target]!.counter}</span>
          <Button
            variant="mono"
            size="sm"
            disabled={target === 0}
            onClick={() => turnTo(0, 'contents')}
          >
            {labels.contents}
          </Button>
        </div>
      </div>
    </div>
  );
}
