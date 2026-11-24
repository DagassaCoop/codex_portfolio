import { useTranslations } from 'next-intl';

import { experience } from '@/entities/experience';
import { Link } from '@/shared/i18n';
import { buttonClassName } from '@/shared/ui/button';
import { ArrowRightIcon } from '@/shared/ui/icons';

import { SectionHead } from '../components/section-head';
import { SpecTable } from './components/spec-table';
import { Timeline } from './components/timeline';
import styles from './Experience.module.css';

/**
 * Fol. 03v, Experience (Home page design, section 1.4): the author's spec sheet on the left
 * (sticky on desktops), the timeline of jobs and studies on the right; one column on tablets.
 */
export function Experience() {
  const t = useTranslations('home.experience');
  const from = Math.min(...experience.map((entry) => entry.start.year));
  const to = Math.max(...experience.map((entry) => entry.end.year));

  return (
    <section id="experience" aria-labelledby="experience-title" className={styles.section}>
      <SectionHead
        folio={t('folio')}
        sheet={t('sheet', { from, to })}
        title={t('title')}
        titleId="experience-title"
        action={
          // The About page is built in M6; until then the link opens the 404 page
          <Link href="/about" className={buttonClassName({ variant: 'primary' })}>
            {t('about')}
            <ArrowRightIcon />
          </Link>
        }
      />

      <div className={styles.body}>
        <SpecTable className={styles.spec} />
        <Timeline className={styles.timeline} />
      </div>
    </section>
  );
}
