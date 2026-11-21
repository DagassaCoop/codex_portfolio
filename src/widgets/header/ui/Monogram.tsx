import { useTranslations } from 'next-intl';

import { siteConfig } from '@/shared/config';
import { Link } from '@/shared/i18n';

import styles from './Monogram.module.css';

/**
 * The author's initials in the sheet's top-left cell: a link to the home page (Home page design, G1).
 * Its accessible name starts with the visible initials (WCAG 2.5.3).
 */
export function Monogram() {
  const t = useTranslations('layout.monogram');
  const { name, initials } = siteConfig.author;

  return (
    <Link href="/" className={styles.monogram} aria-label={t('label', { initials, name })}>
      {initials}
    </Link>
  );
}
