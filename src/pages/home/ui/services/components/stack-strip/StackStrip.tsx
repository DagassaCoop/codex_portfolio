import { useTranslations } from 'next-intl';

import { siteConfig } from '@/shared/config';
import { Badge } from '@/shared/ui/badge';
import { BadgeList } from '@/shared/ui/badge-list';
import { Separator } from '@/shared/ui/separator';

import styles from './StackStrip.module.css';

/**
 * The stack under the directions (Home page design, section 1.3): "Stack", the main technologies
 * as outline badges, then the others. Each group is a list named for screen readers.
 */
export function StackStrip() {
  const t = useTranslations('home.services.stack');
  const { main, other } = siteConfig.stack;

  return (
    <div className={styles.strip}>
      <span className="cx-label">{t('label')}</span>
      <Separator orientation="vertical" aria-hidden className={styles.separator} />
      <BadgeList collapse={false} aria-label={t('main')}>
        {main.map((name) => (
          <Badge key={name} tone="outline">
            {name}
          </Badge>
        ))}
      </BadgeList>
      <Separator orientation="vertical" aria-hidden className={styles.separator} />
      <BadgeList collapse={false} aria-label={t('other')}>
        {other.map((name) => (
          <Badge key={name}>{name}</Badge>
        ))}
      </BadgeList>
    </div>
  );
}
