import type { ExperienceData } from './types';

/** Jobs and studies, newest first. Copy: `messages/{en,fr}.json` → `experience.<id>`. */
export const experience = [
  {
    id: 'brightit',
    kind: 'job',
    company: 'BrightIT · Soft2Bet',
    start: { year: 2025, month: 10 },
    end: { year: 2026, month: 11 },
    location: 'Toronto',
    format: 'onSite',
    employment: 'contractFullTime',
    stack: ['React', 'TypeScript', 'Monorepo', 'GitLab CI/CD'],
  },
  {
    id: 'fitofan',
    kind: 'job',
    company: 'Fitofan',
    start: { year: 2025, month: 8 },
    end: { year: 2025, month: 10 },
    location: 'Mississauga',
    format: 'onSite',
    employment: 'contract',
    stack: ['Next.js', 'TypeScript', 'OAuth'],
  },
  {
    id: 'innopharma',
    kind: 'job',
    company: 'Innopharma Technology',
    start: { year: 2022, month: 12 },
    end: { year: 2024, month: 5 },
    location: 'Dublin',
    format: 'hybrid',
    stack: ['Vue', 'TypeScript', 'AngularJS', 'Docker', 'Jenkins'],
  },
  {
    id: 'goracio',
    kind: 'job',
    company: 'Design Studio Goracio',
    start: { year: 2020, month: 8 },
    end: { year: 2021, month: 10 },
    location: 'Ukraine',
    format: 'onSite',
    stack: ['React', 'CMS'],
  },
  {
    id: 'distributed-lab',
    kind: 'job',
    company: 'Distributed Lab',
    start: { year: 2019, month: 2 },
    end: { year: 2019, month: 5 },
    location: 'Kharkiv',
    stack: [],
  },
  {
    id: 'khpi',
    kind: 'education',
    company: 'NTU «KhPI»',
    start: { year: 2018 },
    end: { year: 2022 },
    location: 'Kharkiv',
    stack: [],
  },
] as const satisfies readonly ExperienceData[];

export type Experience = (typeof experience)[number];
export type ExperienceId = Experience['id'];
