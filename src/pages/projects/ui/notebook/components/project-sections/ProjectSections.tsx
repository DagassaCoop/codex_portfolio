import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import type { ProjectSlug } from '@/entities/project';

import styles from './ProjectSections.module.css';

const SECTIONS = ['role', 'impact', 'challenge'] as const;

type ProjectSectionsProps = {
  slug: ProjectSlug;
};

/** "01 · Role" (role and contribution), "02 · Impact", "03 · Challenge", between lines */
export function ProjectSections({ slug }: ProjectSectionsProps) {
  const t = useTranslations('projectsPage.notebook.project');
  const tProject = useTranslations(`projects.${slug}`);

  return (
    <div className={styles.sections}>
      {SECTIONS.map((section) => (
        <section key={section} className={styles.section}>
          <h4 className={clsx('cx-label', styles.title)}>{t(section)}</h4>
          <p className="cx-small">{tProject(section)}</p>
          {section === 'role' && <p className="cx-small">{tProject('contribution')}</p>}
        </section>
      ))}
    </div>
  );
}
