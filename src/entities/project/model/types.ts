/**
 * The direction of the work (Projects page legend, the notebook): frontend architecture, product UI,
 * fullstack, design system. Titles are translated: `projectsPage.intro.legend.directions.<direction>`.
 */
export type ProjectDirection = 'architecture' | 'product' | 'fullstack' | 'designSystem';

/** Where the project stands: shipped, still being drawn ("In progress"), on the drawing board ("Draft") */
export type ProjectStatus = 'live' | 'wip' | 'draft';

/**
 * A public link from the notebook (new tab). `product` / `demo` / `github` name the button:
 * "Live product", "Live demo", "GitHub" (`projectsPage.notebook.links.<kind>`).
 */
export type ProjectLink = {
  kind: 'product' | 'demo' | 'github';
  href: string;
};

/**
 * Why a project has no public link, shown instead of the links:
 * `projectsPage.notebook.linkNotes.<note>` ("Internal product · no public link", "Not built yet")
 */
export type ProjectLinkNote = 'internal' | 'notBuilt';

/** Countries of the commercial projects (Projects page stats) */
export type ProjectCountry = 'UA' | 'IE' | 'CA';

/**
 * A project, a tavola (Tav.) of the codex: language-independent data (PROJECT_OVERVIEW.md §5).
 * Its copy lives in `messages` under `projects.<slug>`: the card's `domain`, `label`, `title`, `summary`,
 * and the notebook's `fig`, `task`, `role`, `contribution`, `impact`, `challenge`, `stack`.
 */
export type ProjectData = {
  /** Stable id: the key of its copy */
  slug: string;
  /** Tavola number, written in Roman numerals: 1 → "Tav. I" */
  tav: number;
  direction: ProjectDirection;
  status: ProjectStatus;
  /** First and last year; one year for a project inside a single year */
  years: readonly [number] | readonly [number, number];
  /** Company, shown upper-case in the card foot. None: a personal project */
  company?: string;
  /** Where the company is (commercial projects only) */
  country?: ProjectCountry;
  /** Public links, in button order. TODO(content): the real URLs of Tav. I, II, IV and V */
  links?: readonly ProjectLink[];
  /** No public link, and why */
  linkNote?: ProjectLinkNote;
  /** Technologies, in the order the card lists them (not translated) */
  stack: readonly string[];
  /** Shown on the Home page (Selected work) */
  featured: boolean;
};
