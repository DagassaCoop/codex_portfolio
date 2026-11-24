/** What kind of work the project was (Work page filters, M4) */
export type ProjectType = 'frontend' | 'fullstack';

/**
 * A project, a tavola (Tav.) of the codex: language-independent data (PROJECT_OVERVIEW.md §5).
 * Its copy lives in `messages` under `projects.<slug>`: `label`, `title`, `summary`.
 */
export type ProjectData = {
  /** Stable id: the case study's URL (`/work/<slug>`) and the key of its copy */
  slug: string;
  /** Tavola number, written in Roman numerals: 1 → "Tav. I" */
  tav: number;
  type: ProjectType;
  /** First and last year; one year for a project inside a single year */
  years: readonly [number] | readonly [number, number];
  /** Company, shown upper-case in the card foot. None: a personal project */
  company?: string;
  /** Technologies, in the order the card lists them (not translated) */
  stack: readonly string[];
  /** Shown on the Home page (Selected work) */
  featured: boolean;
};
