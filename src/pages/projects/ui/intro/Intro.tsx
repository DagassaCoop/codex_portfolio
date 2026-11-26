import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { projects } from '@/entities/project';
import { Breadcrumb } from '@/shared/ui/breadcrumb';
import { Dimension } from '@/shared/ui/separator';

import { Legend } from './components/legend';
import { Stats } from './components/stats';
import styles from './Intro.module.css';

/** Italian marginalia, part of the drawing layer: not translated (context/SITEMAP.md) */
const MARGINALIA = '— ogni tavola, un problema risolto.';

/** Two digits, as the drawings count: 7 → "07" */
const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Fol. 02, the index of tavole (Projects page design, section 2.0): the folio row with the
 * breadcrumb; the h1, the span of years, the lead and the numbers on the left; the legend of
 * directions on the right. One column on tablets and phones.
 *
 * Every count comes from the project data.
 */
export function Intro() {
  const t = useTranslations('projectsPage.intro');

  const years = projects.flatMap((project) => project.years);
  const commercial = projects.filter((project) => 'company' in project).length;
  const countries = new Set(
    projects.flatMap((project) => ('country' in project ? [project.country] : [])),
  ).size;

  return (
    <section id="top" aria-labelledby="projects-title" className={styles.intro}>
      <div className={styles.top}>
        <div className={styles.folio}>
          <span className={clsx('cx-label', styles.folioNumber)}>{t('folio')}</span>
          <span className="cx-cap">{t('sheet')}</span>
        </div>
        <Breadcrumb
          aria-label={t('breadcrumb.label')}
          items={[{ label: t('breadcrumb.root'), href: '/' }, { label: t('breadcrumb.current') }]}
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.text}>
          <h1 id="projects-title" className={clsx('cx-display', styles.title)}>
            {t('title')}
          </h1>
          <Dimension className={styles.measure}>
            {t('dimension', {
              count: pad(projects.length),
              first: Math.min(...years),
              last: Math.max(...years),
            })}
          </Dimension>
          <p className={clsx('cx-lead', styles.measure)}>{t('lead')}</p>
          <p className={clsx('cx-body', styles.measure)}>{t('body')}</p>
          <Stats
            className={styles.measure}
            label={t('stats.label')}
            items={[
              { key: 'tavole', value: pad(projects.length), label: t('stats.tavole') },
              { key: 'commercial', value: pad(commercial), label: t('stats.commercial') },
              {
                key: 'personal',
                value: pad(projects.length - commercial),
                label: t('stats.personal'),
              },
              {
                key: 'countries',
                value: pad(countries),
                label: t('stats.countries'),
                accent: true,
              },
            ]}
          />
          <span aria-hidden="true" className="cx-marg">
            {MARGINALIA}
          </span>
        </div>

        <Legend className={styles.legend} />
      </div>
    </section>
  );
}
