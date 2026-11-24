import type { ComponentType } from 'react';

import { MigrationDrawing } from './components/migration-drawing';
import { PlatesDrawing } from './components/plates-drawing';
import { TreeDrawing } from './components/tree-drawing';
import styles from './ProjectPreview.module.css';
import type { ProjectSlug } from '../../../../model/projects';

/** One drawing per project, until the case studies have their images */
const DRAWINGS: Record<ProjectSlug, ComponentType> = {
  'soft2bet-platform': PlatesDrawing,
  'life-focus-tree': TreeDrawing,
  'innopharma-migration': MigrationDrawing,
};

type ProjectPreviewProps = {
  slug: ProjectSlug;
};

/**
 * The image of a project card's media (Home page design): a small drawing on the sheet's grid.
 * It covers the media's hatched placeholder, as an image would. Decorative: the card's text says it all.
 */
export function ProjectPreview({ slug }: ProjectPreviewProps) {
  const Drawing = DRAWINGS[slug];

  return (
    <div aria-hidden="true" className={styles.preview}>
      <Drawing />
    </div>
  );
}
