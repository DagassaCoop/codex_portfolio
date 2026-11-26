import type { useTranslations } from 'next-intl';

import type { ProjectSlug } from '@/entities/project';

/** A group of the project's stack: "Frontend" → React, TypeScript */
export type StackGroup = { label: string; items: string[] };

/** The project's stack groups (`projects.<slug>.stack`, an array read with `t.raw`) */
export function readStack(
  t: ReturnType<typeof useTranslations<'projects'>>,
  slug: ProjectSlug,
): StackGroup[] {
  return t.raw(`${slug}.stack`) as StackGroup[];
}
