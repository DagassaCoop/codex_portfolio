import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import type { Locale } from '@/shared/i18n';

import { Intro } from './intro';
import { Notebook } from './notebook';

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'projectsPage.meta' });

  return { title: t('title') };
}

/**
 * Projects (`/[locale]/projects`, Projects page design): Fol. 02, the index of tavole, then the
 * notebook of every project (Fol. 02.1). The contact section follows from the layout.
 */
export function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return (
    <>
      <Intro />
      <Notebook />
    </>
  );
}
