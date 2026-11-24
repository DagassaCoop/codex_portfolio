import { useTranslations } from 'next-intl';

import { experience } from '@/entities/experience';
import { Trace, TraceItem } from '@/shared/ui/trace';

import { ExperienceEntry } from './components/experience-entry';
import styles from './Timeline.module.css';

type TimelineProps = {
  className?: string;
};

/**
 * The timeline (kit Trace, Home page design, section 1.4): "Your team?" on top as the open next
 * step, then jobs and studies, newest first. On phones the years move above the entries.
 */
export function Timeline({ className }: TimelineProps) {
  const t = useTranslations('home.experience.next');

  return (
    <Trace layout="adaptive" className={className}>
      <TraceItem year={t('year')} node="future" bodyClassName={styles.next}>
        <p className={`cx-h4 ${styles.nextTitle}`}>{t('title')}</p>
        {/* The contact section (Fol. 04) is built in M7 */}
        <a href="#contact" className="cx-tlink cx-small">
          {t('link')} <span aria-hidden="true">↗</span>
        </a>
      </TraceItem>
      {experience.map((entry) => (
        <ExperienceEntry key={entry.id} entry={entry} />
      ))}
    </Trace>
  );
}
