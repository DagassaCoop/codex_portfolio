import { useTranslations } from 'next-intl';

import { toRoman } from '@/shared/lib/roman';
import { formatYears } from '@/shared/lib/years';
import { Badge } from '@/shared/ui/badge';
import { BadgeList } from '@/shared/ui/badge-list';
import {
  CARD_ROW_QUERY,
  Card,
  CardArrow,
  CardBody,
  CardFoot,
  CardMedia,
  CardTitle,
  type CardLayout,
} from '@/shared/ui/card';

import { ProjectPreview } from '../project-preview';
import styles from './ProjectCard.module.css';
import type { Project } from '../../model/projects';

type ProjectCardProps = {
  project: Project;
  /** The kit Card's layout; `adaptive` lies sideways on tablets */
  layout?: CardLayout;
  className?: string;
};

/**
 * A project's tavola card (kit Card, DESIGN.md §6), linking to its case study: the preview with
 * the tavola number and the project's domain, the label, title and summary, the stack, then years
 * and company.
 * The tag, the caption and the foot are upper-case, as on the design (the kit does not transform them).
 *
 * The link is the title's, stretched over the card (`link="title"`), because the stack's "…" button
 * cannot sit inside a link. The stack keeps to one row, "…" showing the rest, only while an
 * adaptive card lies sideways (tablets); otherwise it wraps.
 */
export function ProjectCard({ project, layout, className }: ProjectCardProps) {
  const t = useTranslations(`projects.${project.slug}`);
  const tCard = useTranslations('projectCard');
  const { slug, tav, years, stack } = project;
  const company = 'company' in project ? project.company : tCard('personal');

  return (
    // Case studies are built in M5; until then the link opens the 404 page
    <Card link="title" layout={layout} className={className}>
      <CardMedia tag={`TAV. ${toRoman(tav)}`} caption={t('domain').toUpperCase()}>
        <ProjectPreview slug={slug} />
      </CardMedia>
      <CardBody className={styles.body}>
        <span className={`cx-label ${styles.label}`}>{t('label')}</span>
        <CardTitle href={`/work/${slug}`}>{t('title')}</CardTitle>
        <p className="cx-small">{t('summary')}</p>
        <BadgeList
          className={styles.stack}
          collapse={layout === 'adaptive' ? CARD_ROW_QUERY : false}
          moreLabel={tCard('showStack', { count: stack.length })}
        >
          {stack.map((name) => (
            <Badge key={name}>{name}</Badge>
          ))}
        </BadgeList>
      </CardBody>
      <CardFoot>
        <span>{`${formatYears(years[0], years.at(-1))} · ${company}`.toUpperCase()}</span>
        <CardArrow />
      </CardFoot>
    </Card>
  );
}
