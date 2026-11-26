import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import type { ProjectSlug } from '@/entities/project';
import { Badge } from '@/shared/ui/badge';

import { readStack } from './readStack';
import styles from './StackTable.module.css';

type StackTableProps = {
  slug: ProjectSlug;
  /** `fill`: grows to the bottom of a notebook page; the dialog leaves it at its own height */
  fill?: boolean;
};

/**
 * A project's stack (Projects page design, Fol. 02.1): a framed table, "Stack" and the number of
 * technologies on a sunk strip, then the groups, each a caption and its badges. On a narrow
 * table (the dialog on phones) the badges go under the caption.
 */
export function StackTable({ slug, fill = false }: StackTableProps) {
  const t = useTranslations('projectsPage.notebook.project');
  const tProjects = useTranslations('projects');
  const stack = readStack(tProjects, slug);
  const count = stack.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className={clsx(styles.stack, fill && styles.fill)}>
      <div className={styles.head}>
        <span className={clsx('cx-label', styles.label)}>{t('stack')}</span>
        <span className="cx-cap">{t('stackCount', { count: String(count).padStart(2, '0') })}</span>
      </div>
      <dl className={styles.groups}>
        {stack.map((group) => (
          <div key={group.label} className={styles.group}>
            <dt className={clsx('cx-cap', styles.groupLabel)}>{group.label}</dt>
            <dd className={styles.groupItems}>
              <ul className="cx-inline">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
