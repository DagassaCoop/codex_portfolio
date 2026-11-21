import { useTranslations } from 'next-intl';
import type { AnchorHTMLAttributes, ReactElement } from 'react';

import { siteConfig } from '@/shared/config';
import { buttonClassName } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { FileDownIcon, GithubIcon, LinkedinIcon, MailIcon } from '@/shared/ui/icons';
import { Tooltip } from '@/shared/ui/tooltip';

import styles from './SocialRail.module.css';

type RailLink = {
  href: string;
  /** Accessible name: starts with the tooltip's words (WCAG 2.5.3) */
  label: string;
  tip: string;
  icon: ReactElement;
  download?: boolean;
  /** Where the link opens, typed as the `target` attribute of `<a>`: `_blank` for external profiles */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};

/**
 * The sheet's left column (Home page design, G2; DESIGN.md §3 Button Group, §1.9):
 * GitHub, LinkedIn, Email and CV as a vertical group of Secondary icon buttons with tooltips on the right,
 * then "Scroll · Fol. 01 — 04" (decor). The column stays in view while the page scrolls.
 * On phones it turns into a horizontal group at the end of the strip next to the monogram.
 */
export function SocialRail() {
  const t = useTranslations('layout.rail');
  const { github, linkedin, email, cv } = siteConfig.links;

  const links: RailLink[] = [
    { href: github, label: t('github'), tip: t('github'), icon: <GithubIcon />, target: '_blank' },
    {
      href: linkedin,
      label: t('linkedin'),
      tip: t('linkedin'),
      icon: <LinkedinIcon />,
      target: '_blank',
    },
    // The contact section (Fol. 04) is on every page; it is not built yet (M7)
    { href: `mailto:${email}`, label: t('email'), tip: t('email'), icon: <MailIcon /> },
    { href: cv, label: t('cv'), tip: t('cvTip'), icon: <FileDownIcon />, download: true },
  ];

  return (
    <aside aria-label={t('label')} className={styles.rail}>
      <div className={styles.inner}>
        <ButtonGroup aria-label={t('group')} orientation="vertical" className={styles.group}>
          {links.map(({ href, label, tip, icon, download, target }) => (
            <Tooltip key={href} content={tip} side="right" className={styles.tip}>
              <a
                href={href}
                aria-label={label}
                download={download || undefined}
                target={target}
                // A new tab gets no access to this page (window.opener) and no referrer
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className={`${buttonClassName({ variant: 'secondary', iconOnly: true })} ${styles.link}`}
              >
                {icon}
              </a>
            </Tooltip>
          ))}
        </ButtonGroup>

        <div className={styles.scroll} aria-hidden="true">
          <span className={styles.scrollText}>{t('scroll')}</span>
          <svg width="10" height="28" viewBox="0 0 10 28" fill="none" stroke="currentColor">
            <path d="M5 0v26M1 22l4 4 4-4" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
