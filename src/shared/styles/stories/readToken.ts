/**
 * Reads a token's value as the browser sees it, so the stories show what tokens.css really ships
 * instead of a second, hand-copied list of values.
 */
export function readToken(name: `--${string}`): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
