import { siteConfig } from '@/shared/config';

import type { ProjectData } from './types';

/**
 * Every project, in tavola order. Featured ones are on the Home page; the Projects page shows all.
 * Copy: `messages/{en,fr}.json` → `projects.<slug>`.
 */
export const projects = [
  {
    slug: 'soft2bet-platform',
    tav: 1,
    direction: 'architecture',
    status: 'live',
    years: [2025, 2026],
    company: 'Soft2Bet',
    country: 'CA',
    stack: ['React', 'TypeScript', 'Monorepo', 'GitLab CI'],
    featured: true,
  },
  {
    slug: 'life-focus-tree',
    tav: 2,
    direction: 'fullstack',
    status: 'live',
    years: [2026],
    stack: ['Next.js', 'TypeScript', 'd3-hierarchy', 'GraphQL', 'Prisma'],
    featured: true,
  },
  {
    slug: 'innopharma-migration',
    tav: 3,
    direction: 'fullstack',
    status: 'live',
    years: [2022, 2024],
    company: 'Innopharma',
    country: 'IE',
    linkNote: 'internal',
    stack: ['Vue', 'TypeScript', 'AngularJS', 'Docker'],
    featured: true,
  },
  {
    slug: 'sports-platform',
    tav: 4,
    direction: 'fullstack',
    status: 'live',
    years: [2025],
    company: 'Fitofan',
    country: 'CA',
    stack: ['Next.js', 'TypeScript', 'OAuth'],
    featured: false,
  },
  {
    slug: 'studio-sites',
    tav: 5,
    direction: 'product',
    status: 'live',
    years: [2020, 2021],
    company: 'Goracio',
    country: 'UA',
    stack: ['React', 'CMS'],
    featured: false,
  },
  {
    slug: 'codex-portfolio',
    tav: 6,
    direction: 'designSystem',
    status: 'wip',
    years: [2026],
    links: [
      { kind: 'demo', href: siteConfig.url },
      { kind: 'github', href: siteConfig.links.source },
    ],
    stack: ['Next.js', 'TypeScript', 'Base UI', 'next-intl'],
    featured: false,
  },
  {
    slug: 'sports-club-manager',
    tav: 7,
    direction: 'fullstack',
    status: 'draft',
    years: [2026],
    linkNote: 'notBuilt',
    stack: [],
    featured: false,
  },
] as const satisfies readonly ProjectData[];

export type Project = (typeof projects)[number];
export type ProjectSlug = Project['slug'];

/** Projects on the Home page, in tavola order */
export const featuredProjects: readonly Project[] = projects.filter((project) => project.featured);
