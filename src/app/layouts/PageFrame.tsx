import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import styles from './PageFrame.module.css';

/** Column letters of the sheet's top ruler (decor, not translated) */
const RULER_COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

type PageFrameProps = {
  /** Top-left cell: the monogram, a link home */
  monogram?: ReactNode;
  /** Left column under the monogram: social links (a strip under the monogram on phones) */
  rail?: ReactNode;
  /** Top bar: navigation and actions */
  header?: ReactNode;
  /** Bottom row: the drawing's title block */
  footer?: ReactNode;
  /** The page itself, rendered into <main id="main"> */
  children: ReactNode;
};

/**
 * The drawing sheet every page is drawn on (Home page design, DESIGN.md §1.9).
 *
 * A framed sheet with a column ruler above it, split into cells by ink lines:
 * monogram and header on top, the social rail on the left, the page and the footer on the right.
 * The frame owns the cells and the lines between them; the widgets in the slots own their content.
 *
 * DOM order is monogram → rail → header → main → footer, as in the design. On phones it is
 * also the visual order (the rail becomes a strip next to the monogram, above the header).
 */
export function PageFrame({ monogram, rail, header, footer, children }: PageFrameProps) {
  const t = useTranslations('layout');

  return (
    <div className={styles.wrap}>
      <a href="#main" className={styles.skip}>
        {t('skipToContent')}
      </a>

      <div className={styles.frame}>
        <div className={styles.ruler} aria-hidden="true">
          {RULER_COLUMNS.map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
        </div>

        <div className={styles.monogram}>{monogram}</div>
        <div className={styles.rail}>{rail}</div>
        <div className={styles.header}>{header}</div>
        <main id="main" className={styles.main}>
          {children}
        </main>
        <div className={styles.footer}>{footer}</div>
      </div>
    </div>
  );
}
