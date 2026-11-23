import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import type { Locale } from '@/shared/i18n';

import { Hero } from './hero';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

/** Home (`/[locale]`): Fol. 01 hero, then Selected work, What I do and Experience (M3) */
export function HomePage({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return <Hero />;
}
