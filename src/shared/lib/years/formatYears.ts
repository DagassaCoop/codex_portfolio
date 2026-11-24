/** A span of years as the drawings write it: [2025, 2026] → "2025—26", [2026] → "2026" */
export function formatYears(first: number, last?: number): string {
  if (last == null || last === first) return String(first);
  return `${first}—${String(last).slice(-2)}`;
}
