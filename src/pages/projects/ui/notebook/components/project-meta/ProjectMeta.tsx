import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import type { Project } from '@/entities/project';
import { toRoman } from '@/shared/lib/roman';

import styles from './ProjectMeta.module.css';

type ProjectMetaProps = {
  project: Project;
};

/**
 * The head of a project's text (Projects page design, Fol. 02.1): "Direction" and "Domain" with
 * their values, the outlined numeral at the end (decor), a line under them.
 */
export function ProjectMeta({ project }: ProjectMetaProps) {
  const t = useTranslations('projectsPage.notebook.project');
  const tProject = useTranslations(`projects.${project.slug}`);

  return (
    <div className={styles.head}>
      <dl className={styles.meta}>
        <div className={styles.item}>
          <dt className="cx-cap">{t('direction')}</dt>
          <dd className={clsx('cx-label', styles.direction)}>{tProject('label')}</dd>
        </div>
        <div className={styles.item}>
          <dt className="cx-cap">{t('domain')}</dt>
          <dd className={clsx('cx-label', styles.domain)}>{tProject('domain')}</dd>
        </div>
      </dl>
      <span aria-hidden="true" className={styles.numeral}>
        {toRoman(project.tav)}
      </span>
    </div>
  );
}
