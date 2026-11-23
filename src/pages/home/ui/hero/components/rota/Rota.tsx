import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useId } from 'react';

import styles from './Rota.module.css';
import {
  DATABASE_BACK,
  DATABASE_FRONT,
  GEAR,
  NETWORK_EDGES,
  RING,
  RING_LABEL_ARCS,
  SERVER_LINES,
  SPOKE_TICKS,
  SPOKES,
} from './rota.paths';

/** Italian marginalia and caption, part of the drawing layer: not translated (context/SITEMAP.md) */
const HUB_NOTE = 'mozzo cavo — qui passa l’asse';
const CAPTION = 'Fig. 1 — Rota: mozzo cavo, quattro parti sull’anello';

/** Radius of a part's circle */
const PART_R = 82;

type PartKey = 'client' | 'server' | 'database' | 'ai';

/** The four parts clockwise from top left: centre, and where their text starts */
const PARTS: {
  key: PartKey;
  number: string;
  cx: number;
  cy: number;
  side: 'left' | 'right';
}[] = [
  { key: 'client', number: '01', cx: 280, cy: 130, side: 'left' },
  { key: 'server', number: '02', cx: 780, cy: 130, side: 'right' },
  { key: 'database', number: '03', cx: 780, cy: 450, side: 'right' },
  { key: 'ai', number: '04', cx: 280, cy: 450, side: 'left' },
];

/** Text column edges: left parts end at 186, right parts start at 874 */
const TEXT_X = { left: 186, right: 874 } as const;

/** Text rhythm under a part's title: description lines, then the tags */
const LINE = 22;

/** Neural network nodes; `on` marks the path the signal takes (sanguine) */
const NODES: { x: number; y: number; on?: boolean }[] = [
  { x: -118, y: -24 },
  { x: -118, y: 24, on: true },
  { x: -60, y: -48 },
  { x: -60, y: 0, on: true },
  { x: -60, y: 48 },
  { x: 0, y: -66 },
  { x: 0, y: -22, on: true },
  { x: 0, y: 22 },
  { x: 0, y: 66 },
  { x: 60, y: -48 },
  { x: 60, y: 0, on: true },
  { x: 60, y: 48 },
  { x: 118, y: -24, on: true },
  { x: 118, y: 24 },
];

/** Status lights of the three servers: x per light, y per server; the first light of each is lit */
const LIGHT_X = [32, 46, 60];
const SERVER_Y = [-66, -22, 22];

type RotaProps = {
  className?: string;
};

/**
 * Fig. 1, Rota (Home page design, hero): a hollow hub turning slowly in the centre, spokes to four
 * parts on an oval ring (Client, Server, Database, AI), the ring labelled with what passes between
 * them. The hub stops with reduced motion.
 *
 * One image for assistive tech (`role="img"` with a description); the Italian notes are not translated.
 */
export function Rota({ className }: RotaProps) {
  const t = useTranslations('home.hero.rota');
  const id = useId();
  const ref = (name: string) => `${id}-${name}`;

  return (
    <figure className={clsx(styles.figure, className)}>
      <svg role="img" aria-label={t('label')} viewBox="0 0 1060 620" className={styles.svg}>
        <defs>
          <marker
            id={ref('arrow')}
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M1 1L7 4L1 7" className={styles.arrowHead} />
          </marker>
          {Object.entries(RING_LABEL_ARCS).map(([side, d]) => (
            <path key={side} id={ref(`arc-${side}`)} d={d} />
          ))}
          {PARTS.map(({ key, cx, cy }) => (
            <clipPath key={key} id={ref(`clip-${key}`)}>
              <circle cx={cx} cy={cy} r={PART_R} />
            </clipPath>
          ))}
        </defs>

        {/* Construction around the hub */}
        <g className={styles.construction}>
          <path d="M530 150V430M390 290H670" className={styles.dashCross} />
          <circle cx="530" cy="290" r="93" className={styles.dashCircle} />
          <path d="M530 114V53.92" className={styles.dashDot} />
        </g>

        {/* The ring, its direction arrows and labels */}
        <path d={RING} className={styles.ink} />
        {[
          'M523.2 53.97L530 53.92',
          'M869.93 285.28L870 290',
          'M536.8 526.03L530 526.08',
          'M190.07 294.72L190 290',
        ].map((d) => (
          <path key={d} d={d} className={styles.arrow} markerEnd={`url(#${ref('arrow')})`} />
        ))}
        <g className={styles.ringLabels}>
          {(Object.keys(RING_LABEL_ARCS) as (keyof typeof RING_LABEL_ARCS)[]).map((side) => (
            <text key={side}>
              <textPath href={`#${ref(`arc-${side}`)}`} startOffset="50%" textAnchor="middle">
                {t(`ring.${side}`)}
              </textPath>
            </text>
          ))}
        </g>

        {/* Spokes */}
        <path d={SPOKES} className={styles.ink} />
        <path d={SPOKE_TICKS} className={styles.tick} />

        {/* The hub turns */}
        <g className={styles.hub}>
          <path d={GEAR} className={styles.ink} />
          <circle cx="530" cy="290" r="58" className={styles.ink} />
          <circle cx="530" cy="290" r="70" className={styles.hiddenLine} />
          <path d="M588 284H600M588 296H600" className={styles.ink} />
        </g>
        <circle cx="530" cy="290" r="2" className={styles.dot} />
        <text x="530" y="424" textAnchor="middle" className={styles.spec}>
          {t('hub')}
        </text>
        <path d="M538 188 C 540 176, 544 166, 550 156" className={styles.callout} />
        <text x="530" y="148" textAnchor="middle" className={styles.hubNote}>
          {HUB_NOTE}
        </text>

        {/* The four parts, each a vignette cropped by its circle */}
        <g className={styles.parts}>
          <g clipPath={`url(#${ref('clip-client')})`}>
            <g transform="translate(280 130) scale(0.7)">
              <rect x="-90" y="-72" width="180" height="110" rx="6" className={styles.paper} />
              <rect x="-80" y="-62" width="160" height="88" rx="2" />
              <circle cx="0" cy="-67" r="1.8" />
              <path d="M66 32H76" className={styles.led} />
              <path d="M-10 38L-15 64H15L10 38" className={styles.paper} />
              <rect x="-48" y="64" width="96" height="7" rx="3" className={styles.paper} />
            </g>
          </g>
          <circle cx="280" cy="130" r={PART_R} />

          <g clipPath={`url(#${ref('clip-server')})`}>
            <path d="M780 18V242" className={styles.axis} />
            <g transform="translate(780 130) scale(0.7) translate(0 22)">
              {SERVER_Y.map((y) => (
                <rect
                  key={y}
                  x="-86"
                  y={y - 18}
                  width="172"
                  height="36"
                  rx="3"
                  className={styles.paper}
                />
              ))}
              <path d={SERVER_LINES} />
              {SERVER_Y.map((y, row) =>
                LIGHT_X.map((x, light) => (
                  <circle
                    key={`${x} ${y}`}
                    cx={x}
                    cy={y}
                    r="4.2"
                    className={clsx(light === 0 && (row === 1 ? styles.lit : styles.accent))}
                  />
                )),
              )}
            </g>
          </g>
          <circle cx="780" cy="130" r={PART_R} />

          <g clipPath={`url(#${ref('clip-database')})`}>
            <g transform="translate(780 450)">
              <path d="M0 -110V120" className={styles.axis} />
              <path d={DATABASE_FRONT} />
              <path d={DATABASE_BACK} className={styles.hiddenLine} />
              <ellipse cx="0" cy="-46" rx="66" ry="19" />
              <ellipse cx="0" cy="-46" rx="30" ry="8.6" className={styles.axis} />
              <path d="M-46 14H-30M-46 54H-30" className={styles.accent} />
            </g>
          </g>
          <circle cx="780" cy="450" r={PART_R} />

          <g clipPath={`url(#${ref('clip-ai')})`}>
            <g transform="translate(280 450)">
              <path d={NETWORK_EDGES} className={styles.edge} />
              <path d="M-118 24L-60 0L0 -22L60 0L118 -24" className={styles.accent} />
              <g className={styles.paper}>
                {NODES.map(({ x, y, on }) => (
                  <circle
                    key={`${x} ${y}`}
                    cx={x}
                    cy={y}
                    r="7.5"
                    className={clsx(on && styles.accent)}
                  />
                ))}
              </g>
              <path d="M0 -112V112" className={styles.axis} />
            </g>
          </g>
          <circle cx="280" cy="450" r={PART_R} />
        </g>

        {/* Part labels: number and title, description, tags */}
        <path d="M198 130H190M862 130H870M862 450H870M198 450H190" className={styles.leader} />
        {PARTS.map(({ key, number, cy, side }) => {
          const x = TEXT_X[side];
          const anchor = side === 'left' ? 'end' : 'start';
          const top = cy - 30;
          const lines = t(`parts.${key}.description`).split('\n');

          return (
            <g key={key} textAnchor={anchor}>
              <text x={x} y={top} className={styles.partTitle}>
                {number} · {t(`parts.${key}.title`)}
              </text>
              <text className={styles.partDescription}>
                {lines.map((line, index) => (
                  <tspan key={line} x={x} y={top + 24 + index * LINE}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text x={x} y={top + 26 + lines.length * LINE} className={styles.partTags}>
                {t(`parts.${key}.tags`)}
              </text>
            </g>
          );
        })}

        {/* Caption and stamp */}
        <path d="M40 586H1048" className={styles.leader} />
        <text x="40" y="612" className={styles.caption}>
          {CAPTION}
        </text>
        <text x="1048" y="612" textAnchor="end" className={styles.stamp}>
          {t('stamp')}
        </text>
      </svg>
    </figure>
  );
}
