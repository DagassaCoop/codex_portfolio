import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import type { Locale } from '@/shared/i18n';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function HomePage({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('home');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
