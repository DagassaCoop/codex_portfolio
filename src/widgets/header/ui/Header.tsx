import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { LocaleSwitch } from '@/features/switch-locale';
import { navigation, siteConfig } from '@/shared/config';
import { buttonClassName } from '@/shared/ui/button';
import { NavBar, NavLink } from '@/shared/ui/nav-link';

import styles from './Header.module.css';

type HeaderProps = {
  /** The menu button for tablets and phones (the mobile-menu widget), last in the bar */
  menu?: ReactNode;
};

/**
 * The sheet's top bar (Home page design, G1; DESIGN.md §5 Header, §1.9).
 *
 * Sheet label · navigation · language · "Let's talk" · menu button.
 * Tablets hide the label and the navigation, phones also hide the language switch;
 * both are in the mobile menu.
 */
export function Header({ menu }: HeaderProps) {
  const t = useTranslations('layout');

  return (
    <header className={styles.header}>
      <span className={clsx('cx-cap', styles.sheetLabel)}>
        {t('header.sheetLabel', { revision: siteConfig.revision })}
      </span>

      <NavBar aria-label={t('nav.label')} className={styles.nav}>
        {navigation.map(({ key, href }) => (
          <NavLink key={key} href={href}>
            {t(`nav.${key}`)}
          </NavLink>
        ))}
      </NavBar>

      <div className={styles.actions}>
        <LocaleSwitch className={styles.locale} />
        {/* The contact section (Fol. 04) is on every page; it is not built yet (M7) */}
        <a href="#contact" className={buttonClassName({ variant: 'primary', size: 'sm' })}>
          {t('header.letsTalk')}
        </a>
        {menu}
      </div>
    </header>
  );
}
