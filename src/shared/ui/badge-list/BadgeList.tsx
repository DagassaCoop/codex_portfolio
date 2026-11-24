'use client';

import clsx from 'clsx';
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

export type BadgeListProps = Omit<ComponentPropsWithRef<'ul'>, 'children'> & {
  /** The badges, one per item */
  children: ReactNode;
  /**
   * When the list keeps to one row (the first badges, then "…"):
   * - `true` (default): always;
   * - a media query, e.g. `CARD_ROW_QUERY` from Card: only while it matches; otherwise the badges
   *   wrap freely;
   * - `false`: never, a plain wrapping list.
   */
  collapse?: boolean | string;
  /**
   * Accessible name of the "…" button that shows the rest, e.g. "Show all 5 technologies".
   * The button itself only shows "…". Needed whenever the list can collapse: without it there is
   * no "…" to press.
   */
  moreLabel?: string;
};

/** How many badges fit on the first row with the "…" button after them; null: all fit */
type Fit = number | null;

const NO_QUERY = '';

/** Whether a media query matches; false on the server and for no query */
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (query === NO_QUERY) return () => {};
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => query !== NO_QUERY && window.matchMedia(query).matches,
    () => false,
  );
}

const subscribeNever = () => () => {};

/** False in the server HTML and during hydration, true once the client has rendered */
function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

/** Whether the list keeps to one row now. A media query is read on the client only. */
function useCollapse(collapse: boolean | string): boolean {
  const matches = useMediaQuery(typeof collapse === 'string' ? collapse : NO_QUERY);
  return typeof collapse === 'string' ? matches : collapse;
}

/**
 * A row of badges (DESIGN.md §6) that keeps to one line: when they would wrap, only the first ones
 * stay, followed by a "…" badge-button that shows all of them (and the list then wraps freely).
 * Refits when its width changes. `collapse` decides when this applies.
 *
 * Before JS a list with `collapse={true}` is clipped to its first row (no "…"); with a media query,
 * the CSS of the component that owns the query clips it (Card does, for its adaptive layout).
 *
 * @example
 * <BadgeList moreLabel="Show all 5 technologies">
 *   <Badge>Next.js</Badge>
 *   <Badge>TypeScript</Badge>
 * </BadgeList>
 */
export function BadgeList({
  children,
  collapse = true,
  moreLabel,
  className,
  ...props
}: BadgeListProps) {
  const items = Children.toArray(children);
  const id = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);

  const active = useCollapse(collapse);
  const [expanded, setExpanded] = useState(false);
  /** Measuring: every badge and the "…" are laid out, so their positions can be read */
  const [measuring, setMeasuring] = useState(true);
  const [fit, setFit] = useState<Fit>(null);
  /** JS has run: CSS stops clipping the list to its first row */
  const ready = useHydrated();

  // Whenever collapsing turns on, measure again (state adjusted while rendering)
  const [wasActive, setWasActive] = useState(active);
  if (active !== wasActive) {
    setWasActive(active);
    if (active) setMeasuring(true);
  }

  // Measure before paint: which badges fit on the first row, leaving room for the "…"
  useLayoutEffect(() => {
    const list = listRef.current;
    const more = moreRef.current;
    if (!active || !measuring || !list || !more) return;

    const badges = Array.from(list.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement && child !== more,
    );
    const firstTop = badges[0]?.offsetTop ?? 0;
    const firstRow = badges.filter((badge) => badge.offsetTop === firstTop).length;

    if (firstRow === badges.length) {
      setFit(null);
    } else {
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      const width = list.clientWidth;
      let count = firstRow;
      while (count > 0) {
        const last = badges[count - 1];
        const end = last ? last.offsetLeft + last.offsetWidth + gap : 0;
        if (end + more.offsetWidth <= width) break;
        count -= 1;
      }
      setFit(count);
    }
    setMeasuring(false);
  }, [active, measuring]);

  // Refit when the list's width changes (not its height: showing badges changes that)
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !active || expanded) return;

    let width = list.clientWidth;
    const observer = new ResizeObserver(() => {
      if (list.clientWidth === width) return;
      width = list.clientWidth;
      setMeasuring(true);
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [active, expanded]);

  // The "…" button goes away once pressed: keep focus on the list it opened
  useEffect(() => {
    if (expanded) listRef.current?.focus();
  }, [expanded]);

  const withMore = active && !expanded;
  const collapsed = withMore && !measuring && fit != null;

  return (
    <ul
      ref={listRef}
      id={id}
      tabIndex={expanded ? -1 : undefined}
      className={clsx('cx-badge-list', className)}
      data-collapse={collapse === true ? 'always' : collapse ? 'query' : undefined}
      data-ready={ready || undefined}
      {...props}
    >
      {items.map((item, index) => (
        <li key={index} hidden={collapsed && index >= fit}>
          {item}
        </li>
      ))}
      {withMore && moreLabel != null && (
        <li
          ref={moreRef}
          hidden={!measuring && fit == null}
          data-measuring={measuring || undefined}
        >
          <button
            type="button"
            className="cx-badge cx-badge-more"
            aria-label={moreLabel}
            aria-expanded={false}
            aria-controls={id}
            onClick={() => setExpanded(true)}
          >
            …
          </button>
        </li>
      )}
    </ul>
  );
}
