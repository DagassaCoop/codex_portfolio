/**
 * Site data that does not depend on the language (PROJECT_OVERVIEW.md §5, context/SITEMAP.md).
 * Translated copy lives in messages/{en,fr}.json.
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  /** The author, as signed on the drawing: monogram, title block */
  author: {
    name: 'Dmytro Bondar',
    initials: 'DB',
  },

  /** Revision of the drawing (the site) and its year: "Codex · Rev. B", "B · 2026" */
  revision: 'B',
  revisionYear: 2026,

  /** Open to job offers: the footer stamp shows "Open for work" instead of "Say hello" */
  available: true,

  /** Profiles, contacts and files (social rail, footer) */
  links: {
    github: 'https://github.com/DagassaCoop',
    linkedin: 'https://www.linkedin.com/in/dmytro-bondar/',
    email: 'dmytro.bondar.prof@gmail.com',
    cv: '/cv.pdf',
    /** This site's source code (footer stamp) */
    source: 'https://github.com/DagassaCoop/codex_portfolio',
  },
} as const;
