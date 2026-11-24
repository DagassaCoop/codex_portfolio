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

/** An integer in Roman numerals: 3 → "III" (tavola and direction numbers) */
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
