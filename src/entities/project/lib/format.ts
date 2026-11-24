const ROMAN: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

/** A tavola number in Roman numerals: 3 → "III" */
export function toRoman(value: number): string {
  let rest = Math.floor(value);
  let result = '';
  for (const [step, numeral] of ROMAN) {
    while (rest >= step) {
      result += numeral;
      rest -= step;
    }
  }
  return result;
}

/** A project's years as the card foot shows them: [2025, 2026] → "2025—26", [2026] → "2026" */
export function formatYears(years: readonly [number] | readonly [number, number]): string {
  const [first, last] = years;
  if (last == null || last === first) return String(first);
  return `${first}—${String(last).slice(-2)}`;
}
