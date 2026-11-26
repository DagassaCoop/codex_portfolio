import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import type { Project } from '@/entities/project';
import { Badge } from '@/shared/ui/badge';

import styles from './ProjectDetails.module.css';
import { ProjectMeta } from '../project-meta';
import { ProjectSections } from '../project-sections';
import { StackTable } from '../stack-table';

type ProjectDetailsProps = {
  project: Project;
};

/**
 * The body of a project's Details dialog on tablets and phones (Projects page design, "pad";
 * `ProjectsNotebook{Tablet,Mobile}Details`): direction and domain, the status badge, the task,
 * Role / Impact / Challenge and the stack. The dialog's head holds the title, its foot the links.
 */
export function ProjectDetails({ project }: ProjectDetailsProps) {
  const tStatus = useTranslations('projectsPage.intro.legend.status');
  const tProject = useTranslations(`projects.${project.slug}`);

  return (
    <>
      <ProjectMeta project={project} />
      {project.status !== 'live' && (
        <div>
          <Badge tone="warning">{tStatus(`${project.status}.badge`)}</Badge>
        </div>
      )}
      <p className={clsx('cx-body', styles.task)}>{tProject('task')}</p>
      <ProjectSections slug={project.slug} />
      <StackTable slug={project.slug} />
    </>
  );
}
