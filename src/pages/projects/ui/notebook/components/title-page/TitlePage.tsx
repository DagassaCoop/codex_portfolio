import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { siteConfig } from '@/shared/config';

import styles from './TitlePage.module.css';

type TitlePageProps = {
  /** The first and last project, in Roman numerals: "I", "VII" */
  first: string;
  last: string;
  /** The h3's id: focus lands on it when the notebook turns back to the first spread */
  headingId: string;
};

/**
 * The notebook's title page, right of the contents (Projects page design, Fol. 02.1): the label,
 * a compass drawing, "Projects I — VII", the subtitle, a line of text and the author's signature.
 */
export function TitlePage({ first, last, headingId }: TitlePageProps) {
  const t = useTranslations('projectsPage.notebook.titlePage');

  return (
    <>
      <div className={styles.center}>
        <span className={clsx('cx-label', styles.label)}>{t('label')}</span>
        <svg
          aria-hidden="true"
          width="88"
          height="88"
          viewBox="0 0 88 88"
          className={styles.compass}
        >
          <circle cx="44" cy="44" r="38" className={styles.circle} />
          <path d="M44 8L28 76M44 8L60 76" className={styles.legs} />
          <path d="M34 50H54" className={styles.bar} />
          <circle cx="44" cy="8" r="4" className={styles.hinge} />
        </svg>
        <h3 id={headingId} tabIndex={-1} className={clsx('cx-display', styles.title)}>
          <span className={styles.line}>{t('title')}</span>
          <span className={styles.line}>{t('range', { first, last })}</span>
        </h3>
        <span className={clsx('cx-marg', styles.subtitle)}>{t('subtitle')}</span>
        <p className={clsx('cx-small', styles.text)}>{t('text')}</p>
      </div>
      <span className={clsx('cx-cap', styles.signature)}>
        {t('signature', { name: siteConfig.author.name })}
      </span>
    </>
  );
}
