'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { Dialog, DialogBody, DialogFooter, DialogHeader, DialogPopup } from '@/shared/ui/dialog';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from '@/shared/ui/icons';

import { SliderContents, type SliderContentsEntry } from './components/slider-contents';
import styles from './NotebookSlider.module.css';

/** One project's page and its Details dialog, rendered on the server */
export type Slide = {
  /** The page's content (`SlideCard`); the slider adds the Details button */
  card: ReactNode;
  /** The dialog's body (`ProjectDetails`) and footer (`ProjectLinks`, null when empty) */
  details: ReactNode;
  links: ReactNode;
  /** The dialog's title and the label above it: "Life Focus Tree", "Project II · Personal" */
  title: string;
  label: string;
  /** The card's h3, focused when the project is opened from the contents */
  headingId: string;
  /** "Open details: Life Focus Tree" */
  detailsLabel: string;
  /** "Project II of VII" */
  counter: string;
  /** Read out once the page has changed: "Project II of VII: Life Focus Tree" */
  announcement: string;
};

type NotebookSliderProps = {
  slides: Slide[];
  /** A project card without ids, laid out invisibly: it gives every page its height */
  sizer: ReactNode;
  contents: { label: string; range: string; title: string; entries: SliderContentsEntry[] };
  labels: {
    group: string;
    roledescription: string;
    controls: string;
    prev: string;
    next: string;
    contents: string;
    counterContents: string;
    announceContents: string;
    details: string;
    close: string;
  };
};

/** The slide, as on the design: 360ms on the kit's easing */
const SLIDE_MS = 360;
/** A drag past this share of the page's width turns the page */
const SWIPE_SHARE = 0.18;
/** Pages sit 16px apart while they slide */
const GAP = 16;

type FocusTarget = 'heading' | 'contents' | 'prev' | 'next' | null;
type Drag = { x: number; y: number; id: number; mode: 'pending' | 'drag' };

/**
 * The notebook on tablets and phones (Projects page design, Fol. 02.1, "pad"): one page at a time,
 * bound on the left; page 0 is the contents, then one card per project. Swipe, Prev / Next or a
 * contents row slide to the next page (the neighbour comes in beside it); with reduced motion the
 * page changes at once. Details (or a tap on the card) opens the project in a kit Dialog.
 */
export function NotebookSlider({ slides, sizer, contents, labels }: NotebookSliderProps) {
  const [page, setPage] = useState(0);
  const [target, setTarget] = useState<number | null>(null);
  const [dx, setDx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [modal, setModal] = useState<number | null>(null);
  // The dialog keeps its content while it fades out
  const [shown, setShown] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const firstEntryRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const focusTarget = useRef<FocusTarget>(null);
  const busy = useRef(false);
  const drag = useRef<Drag | null>(null);
  const pending = useRef<{ dx: number; target: number | null } | null>(null);
  const moved = useRef(false);
  const frame = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const last = slides.length;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  const width = () => (trackRef.current?.getBoundingClientRect().width ?? 360) + GAP;
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const commit = (to: number) => {
    busy.current = false;
    setPage(to);
    setDx(0);
    setAnimating(false);
    setTarget(null);
  };

  const go = (to: number, focus: FocusTarget) => {
    if (busy.current || moved.current || dragging || to < 0 || to > last || to === page) return;
    focusTarget.current = focus;

    // Bring the page into view when it has scrolled above the window
    const track = trackRef.current;
    if (track && track.getBoundingClientRect().top < 0) {
      track.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }

    if (reducedMotion()) {
      commit(to);
      return;
    }

    busy.current = true;
    const distance = (to > page ? -1 : 1) * width();
    // Mount the neighbour beside the page first, then slide both
    setTarget(to);
    setAnimating(false);
    later(() => {
      setAnimating(true);
      setDx(distance);
    }, 30);
    later(() => commit(to), 30 + SLIDE_MS + 20);
  };

  const snapBack = () => {
    busy.current = true;
    setAnimating(true);
    setDx(0);
    setDragging(false);
    later(() => {
      busy.current = false;
      setAnimating(false);
      setTarget(null);
    }, SLIDE_MS);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (busy.current || (event.pointerType === 'mouse' && event.button !== 0)) return;
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId, mode: 'pending' };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.id) return;
    let offset = event.clientX - current.x;
    const vertical = event.clientY - current.y;

    if (current.mode === 'pending') {
      if (Math.abs(offset) > 8 && Math.abs(offset) > Math.abs(vertical)) {
        current.mode = 'drag';
        event.currentTarget.setPointerCapture(event.pointerId);
      } else {
        // A vertical gesture scrolls the page
        if (Math.abs(vertical) > 8) drag.current = null;
        return;
      }
    }

    // Resistance past the first and the last page
    if ((page === 0 && offset > 0) || (page === last && offset < 0)) offset *= 0.3;
    let next: number | null = offset < 0 ? page + 1 : offset > 0 ? page - 1 : null;
    if (next != null && (next < 0 || next > last)) next = null;
    pending.current = { dx: offset, target: next };

    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      if (!pending.current) return;
      setDx(pending.current.dx);
      setTarget(pending.current.target);
      setDragging(true);
      setAnimating(false);
    });
  };

  const onPointerUp = () => {
    const current = drag.current;
    drag.current = null;
    if (!current || current.mode !== 'drag') return;

    // The click that ends a drag opens nothing
    moved.current = true;
    later(() => (moved.current = false), 0);
    cancelAnimationFrame(frame.current);
    frame.current = 0;

    const { dx: offset, target: next } = pending.current ?? { dx, target };
    pending.current = null;
    const full = width();

    if (next != null && Math.abs(offset) > full * SWIPE_SHARE) {
      busy.current = true;
      focusTarget.current = null;
      setAnimating(true);
      setDx((offset < 0 ? -1 : 1) * full);
      setTarget(next);
      setDragging(false);
      later(() => commit(next), SLIDE_MS + 20);
    } else {
      setDx(offset);
      snapBack();
    }
  };

  const openDetails = (index: number) => {
    if (moved.current || busy.current) return;
    setShown(index);
    setModal(index);
  };

  // Once the page has changed, move focus where the reader expects it
  useEffect(() => {
    const focus = focusTarget.current;
    focusTarget.current = null;
    if (focus === 'heading' && page > 0) {
      document.getElementById(slides[page - 1]!.headingId)?.focus();
    } else if (focus === 'contents') {
      firstEntryRef.current?.focus();
    } else if (focus === 'next' && page === last) {
      prevRef.current?.focus();
    } else if (focus === 'prev' && page === 0) {
      nextRef.current?.focus();
    }
  }, [page, last, slides]);

  const neighbour = target != null && target !== page ? target : null;
  const shownPage = neighbour != null && !dragging ? neighbour : page;
  const slideStyle = {
    transform: `translateX(${dx}px)`,
    transition: animating ? `transform ${SLIDE_MS}ms var(--ease)` : 'none',
  };

  const renderPage = (index: number) => {
    if (index === 0) {
      return (
        <div className={clsx(styles.page, styles.contentsPage)}>
          <SliderContents
            {...contents}
            onOpen={(entry) => go(entry + 1, 'heading')}
            firstEntryRef={firstEntryRef}
          />
        </div>
      );
    }
    const slide = slides[index - 1]!;
    return (
      // A tap anywhere on the page opens the details, as on the design: a pointer shortcut for the
      // Details button below, which is how keyboards and screen readers open them
      <div
        className={clsx(styles.page, styles.projectPage)}
        onClick={(event) => {
          if (!(event.target as Element).closest('button, a')) openDetails(index - 1);
        }}
      >
        {slide.card}
        <div className={styles.detailsRow}>
          <Button
            variant="secondary"
            size="sm"
            aria-haspopup="dialog"
            aria-label={slide.detailsLabel}
            onClick={() => openDetails(index - 1)}
          >
            {labels.details}
            <ArrowUpRightIcon />
          </Button>
        </div>
      </div>
    );
  };

  const counter = shownPage === 0 ? labels.counterContents : slides[shownPage - 1]!.counter;
  const announcement = page === 0 ? labels.announceContents : slides[page - 1]!.announcement;
  const dialog = slides[shown]!;

  return (
    <div className={styles.slider}>
      <span aria-live="polite" className={styles.srOnly}>
        {target == null ? announcement : ''}
      </span>

      <div className={styles.book}>
        <div aria-hidden="true" className={clsx(styles.edge, styles.edgeBack)} />
        <div aria-hidden="true" className={clsx(styles.edge, styles.edgeFront)} />

        <div
          ref={trackRef}
          role="group"
          aria-roledescription={labels.roledescription}
          aria-label={labels.group}
          className={clsx(styles.track, dragging && styles.grabbing)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div aria-hidden="true" inert className={styles.sizer}>
            <div className={styles.page}>
              {sizer}
              <div className={styles.detailsRow}>
                <Button variant="secondary" size="sm" tabIndex={-1}>
                  {labels.details}
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.current} style={slideStyle}>
            {renderPage(page)}
          </div>
          {neighbour != null && (
            <div
              aria-hidden="true"
              inert
              className={styles.current}
              style={{
                ...slideStyle,
                left: neighbour < page ? `calc(-100% - ${GAP}px)` : `calc(100% + ${GAP}px)`,
              }}
            >
              {renderPage(neighbour)}
            </div>
          )}
          <div aria-hidden="true" className={styles.binding} />
          <div aria-hidden="true" className={styles.stitches} />
        </div>
      </div>

      <div className={styles.controls}>
        <ButtonGroup aria-label={labels.controls} className={styles.turn}>
          <Button
            ref={prevRef}
            variant="secondary"
            disabled={shownPage === 0}
            className={styles.turnButton}
            onClick={() => go(page - 1, 'prev')}
          >
            <ArrowLeftIcon />
            {labels.prev}
          </Button>
          <Button
            ref={nextRef}
            variant="secondary"
            disabled={shownPage === last}
            className={styles.turnButton}
            onClick={() => go(page + 1, 'next')}
          >
            {labels.next}
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
        <div className={styles.status}>
          <span className={clsx('cx-label', styles.counter)}>{counter}</span>
          <Button
            variant="mono"
            size="sm"
            disabled={shownPage === 0}
            onClick={() => go(0, 'contents')}
          >
            {labels.contents}
          </Button>
        </div>
      </div>

      <Dialog open={modal != null} onOpenChange={(open) => !open && setModal(null)}>
        <DialogPopup width={620}>
          <DialogHeader label={dialog.label} title={dialog.title} closeLabel={labels.close} />
          <DialogBody className={styles.dialogBody}>{dialog.details}</DialogBody>
          {dialog.links != null && (
            <DialogFooter
              className={styles.dialogFoot}
              // "Let's talk" goes to the contact section on this page: close the dialog first
              onClickCapture={(event) => {
                if ((event.target as Element).closest('a[href^="#"]')) setModal(null);
              }}
            >
              {dialog.links}
            </DialogFooter>
          )}
        </DialogPopup>
      </Dialog>
    </div>
  );
}
