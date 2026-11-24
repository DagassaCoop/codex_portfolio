import { useTranslations } from 'next-intl';

import { Dimension } from '@/shared/ui/separator';

import { SectionHead } from '../components/section-head';
import { Direction, type DirectionKey } from './components/direction';
import { StackStrip } from './components/stack-strip';
import styles from './Services.module.css';

/** The practice's directions, in order (copy: `home.services.directions.<key>`) */
const DIRECTIONS: readonly DirectionKey[] = ['architecture', 'product', 'fullstack'];

/**
 * Fol. 03r, What I do (Home page design, section 1.3): three directions side by side in one panel
 * (stacked on tablets and phones), then the stack.
 */
export function Services() {
  const t = useTranslations('home.services');
  const count = DIRECTIONS.length;

  return (
    <section id="services" aria-labelledby="services-title" className={styles.section}>
      <SectionHead
        folio={t('folio')}
        sheet={t('sheet', { count })}
        title={t('title')}
        titleId="services-title"
      />

      <div className={styles.body}>
        <Dimension>{t('dimension', { count })}</Dimension>
        <div className={styles.directions}>
          {DIRECTIONS.map((key, index) => (
            <Direction key={key} name={key} number={index + 1} />
          ))}
        </div>
        <StackStrip />
      </div>
    </section>
  );
}
