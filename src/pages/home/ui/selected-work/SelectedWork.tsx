import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { featuredProjects, ProjectCard, projects, toRoman } from '@/entities/project';
import { Link } from '@/shared/i18n';
import { buttonClassName } from '@/shared/ui/button';
import { ArrowRightIcon } from '@/shared/ui/icons';

import styles from './SelectedWork.module.css';

/**
 * Fol. 02, Selected work (Home page design, section 1.2): the featured projects as tavola cards,
 * three in a row; one per row on tablets (lying sideways) and phones; "All work" opens the Work page.
 */
export function SelectedWork() {
  const t = useTranslations('home.work');
  const first = featuredProjects[0];
  const last = featuredProjects.at(-1);

  if (!first || !last) return null;

  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <div className={styles.head}>
        <div className={styles.folio}>
          <span className={clsx('cx-label', styles.folioNumber)}>{t('folio')}</span>
          <span className="cx-cap">
            {t('sheet', {
              first: toRoman(first.tav),
              last: toRoman(last.tav),
              total: toRoman(projects.length),
            })}
          </span>
        </div>
        <h2 id="work-title" className={clsx('cx-h2', styles.title)}>
          {t('title')}
        </h2>
        {/* The Work page is built in M4; until then the link opens the 404 page */}
        <Link
          href="/work"
          className={clsx(buttonClassName({ variant: 'primary' }), styles.allWork)}
        >
          {t('allWork')}
          <ArrowRightIcon />
        </Link>
      </div>

      <ul className={styles.cards}>
        {featuredProjects.map((project) => (
          <li key={project.slug} className={styles.item}>
            <ProjectCard project={project} layout="adaptive" className={styles.card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
