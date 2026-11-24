/** A month of a year; `month` 1–12, left out where only the year is known (education) */
export type YearMonth = { year: number; month?: number };

export type WorkFormat = 'onSite' | 'hybrid' | 'remote';
export type Employment = 'contractFullTime' | 'contract';

/**
 * A job or a study: language-independent data (PROJECT_OVERVIEW.md §5).
 * Its copy lives in `messages` under `experience.<id>`: `role`, `points`.
 */
export type ExperienceData = {
  /** Stable id: the key of its copy */
  id: string;
  kind: 'job' | 'education';
  /** Company or school, as written (not translated) */
  company: string;
  start: YearMonth;
  end: YearMonth;
  /** City or country (not translated) */
  location: string;
  format?: WorkFormat;
  employment?: Employment;
  /** Technologies (not translated) */
  stack: readonly string[];
};
