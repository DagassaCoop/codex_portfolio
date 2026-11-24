import type { ProjectData } from './types';

/**
 * Every project, in tavola order. Featured ones are on the Home page; the Work grid (M4) shows all.
 * Copy: `messages/{en,fr}.json` → `projects.<slug>`.
 */
export const projects = [
  {
    slug: 'soft2bet-platform',
    tav: 1,
    type: 'frontend',
    years: [2025, 2026],
    company: 'Soft2Bet',
    stack: ['React', 'TypeScript', 'Monorepo', 'GitLab CI'],
    featured: true,
  },
  {
    slug: 'life-focus-tree',
    tav: 2,
    type: 'fullstack',
    years: [2026],
    stack: ['Next.js', 'TypeScript', 'd3-hierarchy', 'GraphQL', 'Prisma'],
    featured: true,
  },
  {
    slug: 'innopharma-migration',
    tav: 3,
    type: 'fullstack',
    years: [2022, 2024],
    company: 'Innopharma',
    stack: ['Vue', 'TypeScript', 'AngularJS', 'Docker'],
    featured: true,
  },
] as const satisfies readonly ProjectData[];

export type Project = (typeof projects)[number];
export type ProjectSlug = Project['slug'];

/** Projects on the Home page, in tavola order */
export const featuredProjects: readonly Project[] = projects.filter((project) => project.featured);
