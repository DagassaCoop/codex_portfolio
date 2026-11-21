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

  /** Revision of the drawing (the site): "Codex · Rev. B" */
  revision: 'B',

  /** Profiles and files (social rail, footer). Email and availability come with the contact section. */
  links: {
    github: 'https://github.com/DagassaCoop',
    linkedin: 'https://www.linkedin.com/in/dmytro-bondar/',
    email: 'dmytro.bondar.prof@gmail.com',
    cv: '/cv.pdf',
  },
} as const;
