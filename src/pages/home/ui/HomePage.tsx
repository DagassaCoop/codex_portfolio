import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import type { Locale } from '@/shared/i18n';

import styles from './HomePage.module.css';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function HomePage({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return <HomeContent />;
}

// TODO(M3): placeholder that shows the global layout on "/". The Home sections replace it.
function HomeContent() {
  const t = useTranslations('home');

  return (
    <section className={styles.placeholder}>
      <h1 className="cx-h2">{t('title')}</h1>
    </section>
  );
}
