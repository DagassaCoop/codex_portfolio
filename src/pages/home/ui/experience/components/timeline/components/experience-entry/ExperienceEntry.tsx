import { useLocale, useTranslations } from 'next-intl';

import { duration, formatPeriod, type Experience } from '@/entities/experience';
import { formatYears } from '@/shared/lib/years';
import { Badge } from '@/shared/ui/badge';
import { BadgeList } from '@/shared/ui/badge-list';
import { TraceItem } from '@/shared/ui/trace';

import styles from './ExperienceEntry.module.css';

type ExperienceEntryProps = {
  entry: Experience;
};

/**
 * One job or study on the timeline: company (h3), role, period · duration · place · format, what was
 * done, the stack.
 */
export function ExperienceEntry({ entry }: ExperienceEntryProps) {
  const locale = useLocale();
  const t = useTranslations('home.experience');
  const tEntry = useTranslations(`experience.${entry.id}`);
  const points = tEntry.raw('points') as string[];

  const { years, months } = duration(entry);
  const length = [
    years > 0 && t('years', { count: years }),
    months > 0 && t('months', { count: months }),
  ]
    .filter(Boolean)
    .join(' ');

  const role = [
    tEntry('role'),
    'employment' in entry && t(`employment.${entry.employment}`),
    entry.kind === 'education' && t('education'),
  ]
    .filter(Boolean)
    .join(' · ');

  const meta = [
    formatPeriod(entry, locale),
    length,
    entry.location,
    'format' in entry && t(`format.${entry.format}`),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <TraceItem year={formatYears(entry.start.year, entry.end.year)} bodyClassName={styles.body}>
      <h3 className="cx-h4">{entry.company}</h3>
      <span className="cx-small">{role}</span>
      <span className="cx-cap">{meta}</span>
      {points.length > 0 && (
        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {entry.stack.length > 0 && (
        <BadgeList collapse={false} className={styles.stack}>
          {entry.stack.map((name) => (
            <Badge key={name}>{name}</Badge>
          ))}
        </BadgeList>
      )}
    </TraceItem>
  );
}
