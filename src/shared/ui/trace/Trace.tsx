import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export type TraceLayout = 'columns' | 'adaptive';

export type TraceProps = ComponentPropsWithRef<'ol'> & {
  /**
   * - `columns` (default): year · rail · body at every width.
   * - `adaptive`: on phones (≤ 600px) the year moves above the body.
   */
  layout?: TraceLayout;
};

/**
 * The timeline (DESIGN.md §6): an ordered list of `TraceItem`s, newest first.
 *
 * @example
 * <Trace>
 *   <TraceItem year="next" node="future"><b className="cx-h4">Your team?</b></TraceItem>
 *   <TraceItem year="2025—"><h3 className="cx-h4">BrightIT · Soft2Bet</h3></TraceItem>
 * </Trace>
 */
export function Trace({ layout = 'columns', className, ...props }: TraceProps) {
  return (
    <ol
      className={clsx('cx-trace', layout === 'adaptive' && 'cx-trace--adaptive', className)}
      {...props}
    />
  );
}

export type TraceNode = 'past' | 'current' | 'future';

export type TraceItemProps = Omit<ComponentPropsWithRef<'li'>, 'children'> & {
  /** Left column: "2022—24", "next" */
  year: ReactNode;
  /** past: ink fill (default) · current: sanguine ring · future: dashed (an open position) */
  node?: TraceNode;
  /** The body: company as `.cx-h4`, details as `.cx-small` */
  children: ReactNode;
  bodyClassName?: string;
};

/** One entry of the timeline: year · rail with its node · body */
export function TraceItem({
  year,
  node = 'past',
  bodyClassName,
  children,
  ...props
}: TraceItemProps) {
  return (
    <li {...props}>
      <span className="cx-trace-year">{year}</span>
      <span className="cx-trace-rail" aria-hidden="true">
        <span className={clsx('cx-trace-node', node !== 'past' && `cx-trace-node--${node}`)} />
      </span>
      <div className={clsx('cx-trace-body', bodyClassName)}>{children}</div>
    </li>
  );
}
