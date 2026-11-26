import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import type { Project } from '@/entities/project';

import styles from './ProjectTextPage.module.css';
import { ProjectLinks } from '../project-links';
import { ProjectMeta } from '../project-meta';
import { ProjectSections } from '../project-sections';

type ProjectTextPageProps = {
  project: Project;
  /** The h3's id: focus lands on it when the notebook opens this project from the contents */
  headingId: string;
};

/**
 * A project's right page (Projects page design, Fol. 02.1): direction and domain beside the
 * outlined numeral, the title, the task, then Role / Impact / Challenge; at the bottom the public
 * links (new tab), or why there are none, and for a draft the invitation to talk.
 */
export function ProjectTextPage({ project, headingId }: ProjectTextPageProps) {
  const tProject = useTranslations(`projects.${project.slug}`);

  return (
    <>
      <ProjectMeta project={project} />
      <h3 id={headingId} tabIndex={-1} className={clsx('cx-h2', styles.title)}>
        {tProject('title')}
      </h3>
      <p className={clsx('cx-body', styles.task)}>{tProject('task')}</p>
      <ProjectSections slug={project.slug} />
      <div className={clsx('cx-inline', styles.foot)}>
        <ProjectLinks project={project} size="sm" />
      </div>
    </>
  );
}
