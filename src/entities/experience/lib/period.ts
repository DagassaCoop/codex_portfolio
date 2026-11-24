import type { YearMonth } from '../model/types';

type Span = { start: YearMonth; end: YearMonth };

/**
 * How long an entry lasted, both ends included: Oct 2025 — Nov 2026 → 1 year 2 months.
 * Entries known by the year only count whole years (2018 — 2022 → 4 years).
 */
export function duration({ start, end }: Span): { years: number; months: number } {
  if (start.month == null || end.month == null) {
    return { years: end.year - start.year, months: 0 };
  }
  const total = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  return { years: Math.floor(total / 12), months: total % 12 };
}

/**
 * The period as the timeline writes it, months in the locale's short form:
 * "Oct 2025 — Nov 2026", "Aug — Oct 2025" (one year), "2018 — 2022" (years only).
 */
export function formatPeriod({ start, end }: Span, locale: string): string {
  if (start.month == null || end.month == null) return `${start.year} — ${end.year}`;

  const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const name = ({ year, month: m = 1 }: YearMonth) => month.format(Date.UTC(year, m - 1, 1));

  if (start.year === end.year) return `${name(start)} — ${name(end)} ${end.year}`;
  return `${name(start)} ${start.year} — ${name(end)} ${end.year}`;
}
