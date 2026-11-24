import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { toRoman } from '@/shared/lib/roman';
import { Badge } from '@/shared/ui/badge';
import { BadgeList } from '@/shared/ui/badge-list';

import styles from './Direction.module.css';

export type DirectionKey = 'architecture' | 'product' | 'fullstack';

type DirectionProps = {
  /** Its copy: `home.services.directions.<name>` */
  name: DirectionKey;
  /** 1-based: "I" in the box, "Dir. 01" beside it */
  number: number;
};

/**
 * One direction of the practice: its numeral, title, text and tags (Home page design, section 1.3).
 * On tablets the numeral and title sit in a 200px column on the left, text and tags on the right.
 */
export function Direction({ name, number }: DirectionProps) {
  const t = useTranslations('home.services');
  const tags = t.raw(`directions.${name}.tags`) as string[];

  return (
    <article className={styles.direction}>
      <div className={styles.top}>
        <span className="cx-item-num" aria-hidden="true">
          {toRoman(number)}
        </span>
        <span className="cx-cap">
          {t('direction', { number: String(number).padStart(2, '0') })}
        </span>
      </div>
      <h3 className={clsx('cx-h3', styles.title)}>{t(`directions.${name}.title`)}</h3>
      <p className={clsx('cx-small', styles.text)}>{t(`directions.${name}.text`)}</p>
      <BadgeList collapse={false} className={styles.tags}>
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </BadgeList>
    </article>
  );
}
