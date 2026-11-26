import clsx from 'clsx';
import type { ComponentType } from 'react';

import { MigrationDrawing } from './components/migration-drawing';
import { PlatesDrawing } from './components/plates-drawing';
import { TreeDrawing } from './components/tree-drawing';
import styles from './ProjectPreview.module.css';
import type { ProjectSlug } from '../../model/projects';

/**
 * One drawing per project. TODO(design): the projects without one (Tav. IV–VII) show the hatched
 * placeholder until their drawings are made (decided 2026-11-26).
 */
const DRAWINGS: Partial<Record<ProjectSlug, ComponentType>> = {
  'soft2bet-platform': PlatesDrawing,
  'life-focus-tree': TreeDrawing,
  'innopharma-migration': MigrationDrawing,
};

type ProjectPreviewProps = {
  slug: ProjectSlug;
};

/**
 * A project's image (the card's media, the notebook's figure): a small drawing on the sheet's grid.
 * It fills its frame like an image, covering the card media's hatched placeholder; a project without a drawing is hatched.
 * Decorative: the card's text says it all.
 */
export function ProjectPreview({ slug }: ProjectPreviewProps) {
  const Drawing = DRAWINGS[slug];

  return (
    <div aria-hidden="true" className={clsx(styles.preview, !Drawing && styles.placeholder)}>
      {Drawing && <Drawing />}
    </div>
  );
}
