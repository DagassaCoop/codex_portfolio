import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { LocaleSwitch } from '@/features/switch-locale';
import { siteConfig } from '@/shared/config';
import { buttonClassName } from '@/shared/ui/button';
import { NavBar, NavLink } from '@/shared/ui/nav-link';

import styles from './Header.module.css';

/**
 * The sheet's top bar (Home page design, G1; DESIGN.md §5 Header, §1.9).
 *
 * Sheet label · navigation · language · "Let's talk".
 * Tablets hide the label and the navigation, phones also hide the language switch;
 * both move into the mobile menu (M2 stage 5).
 */
export function Header() {
  const t = useTranslations('layout.header');

  return (
    <header className={styles.header}>
      <span className={clsx('cx-cap', styles.sheetLabel)}>
        {t('sheetLabel', { revision: siteConfig.revision })}
      </span>

      <NavBar aria-label={t('nav.label')} className={styles.nav}>
        <NavLink href="/">{t('nav.home')}</NavLink>
        <NavLink href="/work">{t('nav.work')}</NavLink>
        <NavLink href="/about">{t('nav.about')}</NavLink>
      </NavBar>

      <div className={styles.actions}>
        <LocaleSwitch className={styles.locale} />
        {/* The contact section (Fol. 04) is on every page; it is not built yet (M7) */}
        <a href="#contact" className={buttonClassName({ variant: 'primary', size: 'sm' })}>
          {t('letsTalk')}
        </a>
      </div>
    </header>
  );
}
