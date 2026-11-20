import { EB_Garamond, Hanken_Grotesk, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';

/*
 * Kit fonts (DESIGN.md §1.7), self-hosted by next/font: no layout shift, no requests to Google.
 *
 * Each font exposes a CSS variable that the tokens in tokens.css read (--display, --body, --mono, --marg).
 * Space Grotesk, Hanken Grotesk and EB Garamond are variable fonts, so one file covers every weight the kit uses.
 * IBM Plex Mono is static and loads only the weights the kit uses.
 * latin-ext covers French characters outside Latin-1 (œ, Œ, Ÿ).
 */

/** Display: headings (--display) */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

/** Body text (--body) */
const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

/** Labels, captions, code (--mono) */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

/**
 * Marginalia (--marg), italic only.
 * Still awaiting final approval (PROJECT_OVERVIEW.md §10.2). Not preloaded: marginalia is decorative, so a late swap is acceptable.
 */
const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  style: ['italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
  preload: false,
});

/**
 * Class names that define the --font-* variables.
 * Put them on <html>, so the tokens in :root can read them.
 */
export const fontVariables = [spaceGrotesk, hankenGrotesk, ibmPlexMono, ebGaramond]
  .map((font) => font.variable)
  .join(' ');
