import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { ProjectPreview, type Project } from '@/entities/project';
import { toRoman } from '@/shared/lib/roman';
import { Badge } from '@/shared/ui/badge';

import styles from './SlideCard.module.css';

type SlideCardProps = {
  project: Project;
  /**
   * The h3's id: focus lands on it when the project is opened from the contents.
   * Left out on the slider's invisible sizer, so the id stays unique.
   */
  headingId?: string;
};

/**
 * A project's page in the notebook on tablets and phones (Projects page design, Fol. 02.1, "pad"):
 * "Project II" and the outlined numeral, the title (two lines at most), the drawing with the
 * status badge, the task (three lines at most). The slider adds the Details button under it.
 *
 * Every card has the same height: the title and the task keep their line count.
 */
export function SlideCard({ project, headingId }: SlideCardProps) {
  const t = useTranslations('projectsPage.notebook.project');
  const tStatus = useTranslations('projectsPage.intro.legend.status');
  const tProject = useTranslations(`projects.${project.slug}`);
  const id = toRoman(project.tav);

  return (
    <>
      <div className={styles.head}>
        <span className={clsx('cx-label', styles.tag)}>{t('tag', { id })}</span>
        <span aria-hidden="true" className={styles.numeral}>
          {id}
        </span>
      </div>
      <h3
        id={headingId}
        tabIndex={headingId ? -1 : undefined}
        className={clsx('cx-h2', styles.title)}
      >
        {tProject('title')}
      </h3>
      <div className={styles.frame}>
        <ProjectPreview slug={project.slug} />
        {project.status !== 'live' && (
          <Badge tone="warning" className={styles.status}>
            {tStatus(`${project.status}.badge`)}
          </Badge>
        )}
      </div>
      <p className={clsx('cx-body', styles.task)}>{tProject('task')}</p>
    </>
  );
}
