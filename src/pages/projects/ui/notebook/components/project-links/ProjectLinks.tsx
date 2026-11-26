import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import type { Project, ProjectStatus } from '@/entities/project';
import { buttonClassName, type ButtonSize } from '@/shared/ui/button';
import { ArrowRightIcon, GithubIcon, GlobeIcon } from '@/shared/ui/icons';

import styles from './ProjectLinks.module.css';

type ProjectLinksProps = {
  project: Project;
  /** `sm` on a notebook page, `md` in the dialog's footer */
  size?: ButtonSize;
};

/** Whether the project has anything for its links row: links, a note or the draft's invitation */
export function hasProjectLinks(project: Project): boolean {
  // Typed wide: with today's data every project without links or a note is live
  const status: ProjectStatus = project.status;
  return 'links' in project || 'linkNote' in project || status === 'draft';
}

/**
 * A project's links (Projects page design, Fol. 02.1), without a wrapper: the public links as
 * Secondary buttons (new tab), or the reason there are none in a dashed box, and for a draft the
 * invitation to talk (→ the contact section).
 */
export function ProjectLinks({ project, size = 'md' }: ProjectLinksProps) {
  const t = useTranslations('projectsPage.notebook');
  const tLayout = useTranslations('layout');
  const links = 'links' in project ? project.links : [];

  return (
    <>
      {links.map(({ kind, href }) => {
        const Icon = kind === 'github' ? GithubIcon : GlobeIcon;
        return (
          <a
            key={kind}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tLayout('newTab', { label: t(`links.${kind}`) })}
            className={buttonClassName({ variant: 'secondary', size })}
          >
            <Icon />
            {t(`links.${kind}`)}
            <span aria-hidden="true" className={styles.arrow}>
              ↗
            </span>
          </a>
        );
      })}
      {'linkNote' in project && (
        <span className={clsx('cx-cap', styles.note, size === 'sm' && styles.noteSm)}>
          {t(`linkNotes.${project.linkNote}`)}
        </span>
      )}
      {project.status === 'draft' && (
        <a href="#contact" className={buttonClassName({ variant: 'link' })}>
          {t('draftCta')}
          <ArrowRightIcon />
        </a>
      )}
    </>
  );
}
