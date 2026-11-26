import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { ProjectPreview, type Project } from '@/entities/project';
import { toRoman } from '@/shared/lib/roman';
import { Badge } from '@/shared/ui/badge';

import styles from './ProjectFigurePage.module.css';
import { StackTable } from '../stack-table';

type ProjectFigurePageProps = {
  project: Project;
};

/**
 * A project's left page (Projects page design, Fol. 02.1): "Project II" and whether it was
 * commercial or personal; the figure (the project's drawing, its status badge, the caption);
 * the stack, by group.
 */
export function ProjectFigurePage({ project }: ProjectFigurePageProps) {
  const t = useTranslations('projectsPage.notebook.project');
  const tStatus = useTranslations('projectsPage.intro.legend.status');
  const tProjects = useTranslations('projects');
  const { slug, status } = project;
  const id = toRoman(project.tav);

  return (
    <>
      <div className={styles.head}>
        <span className={clsx('cx-label', styles.tag)}>{t('tag', { id })}</span>
        <span className="cx-cap">{'company' in project ? t('commercial') : t('personal')}</span>
      </div>

      <figure className={styles.figure}>
        <div className={styles.frame}>
          <ProjectPreview slug={slug} />
          {status !== 'live' && (
            <Badge tone="warning" className={styles.status}>
              {tStatus(`${status}.badge`)}
            </Badge>
          )}
        </div>
        <figcaption className={clsx('cx-marg', styles.caption)}>
          {t('fig', { id, caption: tProjects(`${slug}.fig`) })}
        </figcaption>
      </figure>

      <StackTable slug={slug} fill />
    </>
  );
}
