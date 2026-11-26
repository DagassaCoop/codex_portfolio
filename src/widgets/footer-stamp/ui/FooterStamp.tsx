import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { siteConfig } from '@/shared/config';

import styles from './FooterStamp.module.css';

/**
 * The drawing's title block at the bottom of the sheet (Home page design, G4; DESIGN.md §1.9).
 *
 * Five cells (Drawn by, Role, Rev., Location, Source), then a wider blank cell hatched like a
 * disabled button (the "Let's talk" button that stood there was removed on 2026-11-26).
 */
export function FooterStamp() {
  const t = useTranslations('layout.footer');
  const tLayout = useTranslations('layout');
  const { author, revision, revisionYear, links } = siteConfig;

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
        <a
          href={links.source}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tLayout('newTab', { label: t('sourceLink') })}
          className="cx-tlink"
        >
          {t('sourceLink')} <span aria-hidden="true">↗</span>
        </a>
      </StampCell>

      {/* The last cell is left blank, hatched like a disabled button (decor) */}
      <div aria-hidden="true" className={styles.blank} />
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
