import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export type TableProps = ComponentPropsWithRef<'table'> & {
  /** Below the table, EB Garamond italic: "Tav. I — specifica tecnica" */
  caption?: ReactNode;
  /** Class of the ink frame around the table */
  wrapClassName?: string;
};

/**
 * The spec sheet table (DESIGN.md §6), in its ink frame. Compose it from the parts below.
 *
 * @example
 * <Table caption="Tav. I — specifica tecnica">
 *   <TableHead>
 *     <TableRow><TableHeader>Spec</TableHeader><TableHeader numeric>Rev.</TableHeader></TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow><TableCell>Stack</TableCell><TableCell numeric>A</TableCell></TableRow>
 *   </TableBody>
 * </Table>
 */
export function Table({ caption, wrapClassName, className, children, ...props }: TableProps) {
  return (
    <div className={clsx('cx-table-wrap', wrapClassName)}>
      <table className={clsx('cx-table', className)} {...props}>
        {caption != null && <caption>{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

export function TableHead(props: ComponentPropsWithRef<'thead'>) {
  return <thead {...props} />;
}

export function TableBody(props: ComponentPropsWithRef<'tbody'>) {
  return <tbody {...props} />;
}

export type TableRowProps = ComponentPropsWithRef<'tr'> & {
  /** The highlighted row: sanguine-wash */
  selected?: boolean;
};

/** A row; body rows turn sunk on hover */
export function TableRow({ selected, ...props }: TableRowProps) {
  return <tr data-selected={selected || undefined} {...props} />;
}

export type TableHeaderProps = ComponentPropsWithRef<'th'> & {
  /** Right-aligned, for a column of values */
  numeric?: boolean;
};

/** A column header (`scope="col"` unless given) */
export function TableHeader({ numeric, scope = 'col', className, ...props }: TableHeaderProps) {
  return <th scope={scope} className={clsx(numeric && 'num', className)} {...props} />;
}

export type TableCellProps = ComponentPropsWithRef<'td'> & {
  /** Right-aligned mono, for values */
  numeric?: boolean;
};

export function TableCell({ numeric, className, ...props }: TableCellProps) {
  return <td className={clsx(numeric && 'num', className)} {...props} />;
}
