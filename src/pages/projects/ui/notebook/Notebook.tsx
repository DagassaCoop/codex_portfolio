import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { projects } from '@/entities/project';
import { toRoman } from '@/shared/lib/roman';

import { NotebookSlider, type Slide } from './components/notebook-slider';
import { NotebookSpread, type Spread } from './components/notebook-spread';
import { ProjectDetails } from './components/project-details';
import { ProjectFigurePage } from './components/project-figure-page';
import { hasProjectLinks, ProjectLinks } from './components/project-links';
import { ProjectTextPage } from './components/project-text-page';
import { SlideCard } from './components/slide-card';
import { TitlePage } from './components/title-page';
import styles from './Notebook.module.css';

/**
 * Folios of spread `k` (decor, the codex's foliation): the left page is the verso of leaf k + 1,
 * the right page the recto of leaf k + 2. Spread 0 is "fol. 1v — 2r".
 */
const leftFolio = (k: number) => `fol. ${k + 1}v`;
const rightFolio = (k: number) => `fol. ${k + 2}r`;

const TITLE_PAGE_HEADING = 'notebook-title-page';
const headingId = (tav: number) => `notebook-tav-${tav}`;
const slideHeadingId = (tav: number) => `notebook-slide-tav-${tav}`;

/**
 * Fol. 02.1, the notebook of every project (Projects page design, variant F): the section head,
 * then the book in one of two layouts, switched by CSS at 1024px:
 * - desktops, the spread: spread 0 is the contents and the title page; each project is one
 *   spread, its figure and stack on the left, its text on the right; the pages turn;
 * - tablets and phones, the slider: page 0 is the contents, then one card per project; the
 *   pages slide (swipe or buttons) and Details opens the project in a dialog.
 *
 * The pages are rendered here, on the server; the client parts only choose which to show.
 */
export function Notebook() {
  const t = useTranslations('projectsPage.notebook');
  const tProjects = useTranslations('projects');

  const first = toRoman(projects[0]!.tav);
  const last = toRoman(projects.at(-1)!.tav);
  const total = toRoman(projects.length);
  const spreadCount = projects.length + 1;

  const spreads: Spread[] = [
    {
      left: null,
      right: <TitlePage first={first} last={last} headingId={TITLE_PAGE_HEADING} />,
      leftFolio: leftFolio(0),
      rightFolio: rightFolio(0),
      headingId: TITLE_PAGE_HEADING,
      counter: t('controls.counterContents', { folios: `${leftFolio(0)} — ${rightFolio(0)}` }),
      announcement: t('controls.announceContents'),
    },
    ...projects.map((project, index): Spread => {
      const k = index + 1;
      const id = toRoman(project.tav);
      return {
        left: <ProjectFigurePage project={project} />,
        right: <ProjectTextPage project={project} headingId={headingId(project.tav)} />,
        leftFolio: leftFolio(k),
        rightFolio: rightFolio(k),
        headingId: headingId(project.tav),
        counter: t('controls.counterProject', {
          id,
          total,
          folios: `${leftFolio(k)} — ${rightFolio(k)}`,
        }),
        announcement: t('controls.announceProject', {
          spread: k + 1,
          spreads: spreadCount,
          id,
          title: tProjects(`${project.slug}.title`),
        }),
      };
    }),
  ];

  const slides: Slide[] = projects.map((project) => {
    const id = toRoman(project.tav);
    const title = tProjects(`${project.slug}.title`);
    const origin = 'company' in project ? t('project.commercial') : t('project.personal');
    return {
      card: <SlideCard project={project} headingId={slideHeadingId(project.tav)} />,
      details: <ProjectDetails project={project} />,
      links: hasProjectLinks(project) ? <ProjectLinks project={project} /> : null,
      title,
      label: `${t('project.tag', { id })} · ${origin}`,
      headingId: slideHeadingId(project.tav),
      detailsLabel: t('slider.detailsLabel', { title }),
      counter: t('slider.counterProject', { id, total }),
      announcement: t('slider.announceProject', { id, total, title }),
    };
  });

  return (
    <section
      id="notebook"
      aria-labelledby="notebook-title"
      aria-roledescription={t('roledescription')}
      className={styles.section}
    >
      <div className={styles.head}>
        <div className={styles.folio}>
          <span className={clsx('cx-label', styles.folioNumber)}>{t('folio')}</span>
          <span className={clsx('cx-cap', styles.forSpread)}>{t('sheet')}</span>
          <span className={clsx('cx-cap', styles.forSlider)}>{t('slider.sheet')}</span>
        </div>
        <h2 id="notebook-title" className={clsx('cx-h2', styles.title)}>
          {t('title')}
        </h2>
        <span aria-hidden="true" className={clsx('cx-marg', styles.marginalia)}>
          <span className={styles.forSpread}>{t('marginalia')}</span>
          <span className={styles.forSlider}>{t('slider.marginalia')}</span>
        </span>
      </div>

      <div className={clsx(styles.body, styles.forSpread)}>
        <NotebookSpread
          spreads={spreads}
          contents={{
            label: t('contents.label'),
            range: t('contents.range', { first, last }),
            note: t('contents.note'),
            entries: projects.map((project, index) => ({
              tag: t('project.tag', { id: toRoman(project.tav) }),
              title: tProjects(`${project.slug}.title`),
              folio: leftFolio(index + 1),
            })),
          }}
          labels={{
            controls: t('controls.label'),
            prev: t('controls.prev'),
            next: t('controls.next'),
            contents: t('controls.contents'),
          }}
        />
      </div>

      <div className={clsx(styles.body, styles.forSlider)}>
        <NotebookSlider
          slides={slides}
          sizer={<SlideCard project={projects[0]!} />}
          contents={{
            label: t('contents.label'),
            range: t('contents.range', { first, last }),
            title: t('slider.contentsTitle'),
            entries: projects.map((project) => ({
              id: toRoman(project.tav),
              title: tProjects(`${project.slug}.title`),
            })),
          }}
          labels={{
            group: t('slider.label'),
            roledescription: t('slider.roledescription'),
            controls: t('controls.label'),
            prev: t('controls.prev'),
            next: t('controls.next'),
            contents: t('controls.contents'),
            counterContents: t('slider.counterContents'),
            announceContents: t('controls.announceContents'),
            details: t('slider.details'),
            close: t('slider.close'),
          }}
        />
      </div>
    </section>
  );
}
