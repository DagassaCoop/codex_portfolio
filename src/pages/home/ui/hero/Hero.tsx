import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { siteConfig } from '@/shared/config';
import { Badge } from '@/shared/ui/badge';
import { buttonClassName } from '@/shared/ui/button';
import { ArrowRightIcon } from '@/shared/ui/icons';
import { Dimension } from '@/shared/ui/separator';

import { ConstructedName } from './components/constructed-name';
import { CursorCoordinates } from './components/cursor-coordinates';
import { Rota } from './components/rota';
import styles from './Hero.module.css';

/** Italian marginalia, part of the drawing layer: not translated (context/SITEMAP.md) */
const MARGINALIA = '— ogni marca, una sola macchina.';

/**
 * Fol. 01, the frontispiece (Home page design, section 1.1).
 *
 * The constructed name (h1) above; below it, the text column on the left and the Rota drawing on the right
 * (one column on tablets and phones, the drawing under the text).
 */
export function Hero() {
  const t = useTranslations('home.hero');
  const { author, available, links } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-name" className={styles.hero}>
      <div className={styles.nameZone}>
        <div className={styles.top}>
          <div className={styles.folio}>
            <span className={clsx('cx-label', styles.folioNumber)}>{t('folio')}</span>
            <span className="cx-cap">{t('sheet')}</span>
          </div>
          <CursorCoordinates className="cx-cap" />
        </div>

        <h1 id="hero-name" className={styles.name}>
          <span className={styles.srOnly}>{author.name}</span>
          <ConstructedName />
        </h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.text}>
          <p className="cx-h2">{t('role')}</p>
          <Dimension className={styles.measure}>520 PX</Dimension>
          <p className={clsx('cx-lead', styles.measure)}>{t('lead')}</p>

          <div className={clsx('cx-inline', styles.badges)}>
            {available ? (
              <Badge tone="success" dot="pulse">
                {t('available')}
              </Badge>
            ) : (
              <Badge dot>{t('unavailable')}</Badge>
            )}
            <Badge>{t('location')}</Badge>
          </div>

          <div className={clsx('cx-inline', styles.actions)}>
            {/* Selected work (Fol. 02) on this page, built later in M3 */}
            <a href="#work" className={buttonClassName({ variant: 'primary' })}>
              {t('viewWork')}
              <ArrowRightIcon />
            </a>
            <a href={links.cv} download className={buttonClassName({ variant: 'secondary' })}>
              {t('downloadCv')}
            </a>
          </div>

          <span aria-hidden="true" className={clsx('cx-marg', styles.marginalia)}>
            {MARGINALIA}
          </span>
        </div>

        <Rota className={styles.drawing} />
      </div>
    </section>
  );
}
