import { useTranslations } from 'next-intl';

import { featuredProjects, ProjectCard, projects } from '@/entities/project';
import { Link } from '@/shared/i18n';
import { toRoman } from '@/shared/lib/roman';
import { buttonClassName } from '@/shared/ui/button';
import { ArrowRightIcon } from '@/shared/ui/icons';

import styles from './SelectedWork.module.css';
import { SectionHead } from '../components/section-head';

/**
 * Fol. 02, Selected work (Home page design, section 1.2): the featured projects as tavola cards,
 * three in a row; one per row on tablets (lying sideways) and phones; "All work" opens the Projects page.
 */
export function SelectedWork() {
  const t = useTranslations('home.work');
  const first = featuredProjects[0];
  const last = featuredProjects.at(-1);

  if (!first || !last) return null;

  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <SectionHead
        folio={t('folio')}
        sheet={t('sheet', {
          first: toRoman(first.tav),
          last: toRoman(last.tav),
          total: toRoman(projects.length),
        })}
        title={t('title')}
        titleId="work-title"
        action={
          <Link href="/projects" className={buttonClassName({ variant: 'primary' })}>
            {t('allWork')}
            <ArrowRightIcon />
          </Link>
        }
      />

      <ul className={styles.cards}>
        {featuredProjects.map((project) => (
          <li key={project.slug} className={styles.item}>
            <ProjectCard project={project} layout="adaptive" className={styles.card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
