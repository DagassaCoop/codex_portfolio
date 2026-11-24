/** A project's years as the card foot shows them: [2025, 2026] → "2025—26", [2026] → "2026" */
export function formatYears(years: readonly [number] | readonly [number, number]): string {
  const [first, last] = years;
  if (last == null || last === first) return String(first);
  return `${first}—${String(last).slice(-2)}`;
}
