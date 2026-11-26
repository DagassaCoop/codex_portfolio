import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { projects, type ProjectDirection } from '@/entities/project';
import { Badge } from '@/shared/ui/badge';
import { Item, ItemList } from '@/shared/ui/item';

import styles from './Legend.module.css';

/** The directions in the legend's order, each with the letter in its square (decor) */
const DIRECTIONS: readonly { direction: ProjectDirection; letter: string }[] = [
  { direction: 'architecture', letter: 'A' },
  { direction: 'product', letter: 'U' },
  { direction: 'fullstack', letter: 'F' },
  { direction: 'designSystem', letter: 'D' },
];

const STATUSES = ['wip', 'draft'] as const;

type LegendProps = {
  className?: string;
};

/**
 * The legend beside the intro (Projects page design): the four directions of work as kit Item
 * rows, each with the number of projects in it (from the data), then the two status badges the
 * notebook uses.
 */
export function Legend({ className }: LegendProps) {
  const t = useTranslations('projectsPage.intro.legend');

  return (
    <aside aria-labelledby="projects-legend" className={clsx(styles.legend, className)}>
      <div className={styles.head}>
        <h2 id="projects-legend" className="cx-label">
          {t('title', { count: DIRECTIONS.length })}
        </h2>
        <span aria-hidden="true" className="cx-cap">
          {t('count')}
        </span>
      </div>

      <ItemList className={styles.list}>
        {DIRECTIONS.map(({ direction, letter }) => {
          const count = projects.filter((project) => project.direction === direction).length;
          return (
            <Item
              key={direction}
              num={<span aria-hidden="true">{letter}</span>}
              title={t(`directions.${direction}.title`)}
              meta={<span className="cx-small">{t(`directions.${direction}.text`)}</span>}
              end={
                <Badge tone="outline">
                  <span aria-hidden="true">{String(count).padStart(2, '0')}</span>
                  <span className={styles.srOnly}>{t('countLabel', { count })}</span>
                </Badge>
              }
            />
          );
        })}
      </ItemList>

      <dl aria-label={t('status.label')} className={styles.statuses}>
        {STATUSES.map((status) => (
          <div key={status} className="cx-inline">
            <dt>
              <Badge tone="warning">{t(`status.${status}.badge`)}</Badge>
            </dt>
            <dd className={clsx('cx-small', styles.statusText)}>{t(`status.${status}.text`)}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
