import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { siteConfig } from '@/shared/config';
import { buttonClassName } from '@/shared/ui/button';

import styles from './FooterStamp.module.css';

/**
 * The drawing's title block at the bottom of the sheet (Home page design, G4; DESIGN.md §1.9).
 *
 * Five cells (Drawn by, Role, Rev., Location, Source), then the "Let's talk" cell:
 * a Primary button the size of a cell, with the availability status above the label.
 */
export function FooterStamp() {
  const t = useTranslations('layout.footer');
  const { author, revision, revisionYear, available, links } = siteConfig;

  return (
    <footer aria-label={t('label')} className={styles.stamp}>
      <StampCell label={t('drawnBy')}>
        <span className={styles.name}>{author.name}</span>
      </StampCell>
      <StampCell label={t('role')}>{t('roleValue')}</StampCell>
      <StampCell label={t('rev')}>
        <span className={styles.mono}>
          {revision} · {revisionYear}
        </span>
      </StampCell>
      <StampCell label={t('location')}>{t('locationValue')}</StampCell>
      <StampCell label={t('source')}>
        <a href={links.source} target="_blank" rel="noopener noreferrer" className="cx-tlink">
          {t('sourceLink')}
        </a>
      </StampCell>

      {/* The contact section (Fol. 04) is on every page; it is not built yet (M7) */}
      <a href="#contact" className={clsx(buttonClassName({ variant: 'primary' }), styles.cta)}>
        <span className={styles.ctaText}>
          <span className={styles.status}>
            {t(available ? 'status.available' : 'status.unavailable')}
          </span>
          <span className={styles.ctaLabel}>{t('letsTalk')}</span>
        </span>
        <span className={styles.ctaArrow} aria-hidden="true">
          ↗
        </span>
      </a>
    </footer>
  );
}

function StampCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.cell}>
      <span className="cx-cap">{label}</span>
      <span className={styles.value}>{children}</span>
    </div>
  );
}
