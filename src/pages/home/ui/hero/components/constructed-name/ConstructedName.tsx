import { useId } from 'react';

import { NameDimensions } from './components/name-dimensions';
import styles from './ConstructedName.module.css';
import { EDGES, GUIDES, LINE_ONE, LINE_TWO, VIEW_BOX } from './constructedName.paths';

const { capOne, capTwo, baseOne, baseTwo } = GUIDES;
const { left, right } = EDGES;

/** Line ends of the cap lines and baselines */
const GUIDE_START = 84;
const GUIDE_END = VIEW_BOX.x + VIEW_BOX.width;

/** Compass constructions: the bowls of the D (line I) and the O (line II) */
const COMPASS_D = { cx: 208.51, cy: 192.75 };
const COMPASS_O = { cx: 557.64, cy: 355.99 };
const COMPASS_R = 92.75;

/** The y of the overall width dimension line */
const WIDTH_LINE = 476.93;

/**
 * The constructed name (Home page design, hero): DMYTRO over BONDAR in outline, on its cap lines
 * and baselines, with compass constructions and dimensions. Where BONDAR covers DMYTRO, the hidden
 * edges of DMYTRO are dashed.
 *
 * Decor (`aria-hidden`): the h1 around it carries the name as text.
 */
export function ConstructedName() {
  const id = useId();
  const lineTwoId = `${id}-line-two`;
  const visibleId = `${id}-visible`;
  const hiddenId = `${id}-hidden`;
  const lineOneId = `${id}-line-one`;

  const box = `${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.width} ${VIEW_BOX.height}`;

  return (
    <span className={styles.drawing}>
      <svg aria-hidden="true" viewBox={box} className={styles.svg}>
        <defs>
          <g id={lineOneId}>
            {LINE_ONE.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g id={lineTwoId}>
            {LINE_TWO.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          {/* Line I is drawn twice: solid outside line II, dashed under it */}
          <mask id={visibleId} maskUnits="userSpaceOnUse" x="0" y="0" width="1376" height="520">
            <rect x="0" y="0" width="1376" height="520" fill="#fff" />
            <use href={`#${lineTwoId}`} fill="#000" />
          </mask>
          <mask id={hiddenId} maskUnits="userSpaceOnUse" x="0" y="0" width="1376" height="520">
            <rect x="0" y="0" width="1376" height="520" fill="#000" />
            <use href={`#${lineTwoId}`} fill="#fff" />
          </mask>
        </defs>

        {/* Cap lines and baselines */}
        <path
          className={styles.guide}
          d={[capOne, capTwo, baseOne, baseTwo]
            .map((y) => `M${GUIDE_START} ${y}H${GUIDE_END}`)
            .join('')}
        />
        <g className={styles.guideLabels}>
          <text x={GUIDE_END} y={capOne - 5}>
            CAP · I
          </text>
          <text x={GUIDE_END} y={capTwo - 5}>
            CAP · II
          </text>
          <text x={GUIDE_END} y={baseOne - 5}>
            BASE · I
          </text>
          <text x={GUIDE_END} y={baseTwo - 5}>
            BASE · II
          </text>
        </g>

        {/* Compass constructions */}
        <g className={styles.compass}>
          <circle className={styles.compassCircle} r={COMPASS_R} {...COMPASS_D} />
          <path
            className={styles.compassCross}
            d={`M${COMPASS_D.cx} 93.38V292.12M109.13 ${COMPASS_D.cy}H307.88`}
          />
        </g>
        <circle className={styles.compassCentre} r="2" {...COMPASS_D} />
        <circle
          className={`${styles.compassCircle} ${styles.compassFaint}`}
          r={COMPASS_R}
          {...COMPASS_O}
        />
        <circle className={styles.compassCentre} r="2" {...COMPASS_O} />

        {/* The letters */}
        <use href={`#${lineOneId}`} className={styles.outline} mask={`url(#${visibleId})`} />
        <use href={`#${lineOneId}`} className={styles.hiddenEdge} mask={`url(#${hiddenId})`} />
        <use href={`#${lineTwoId}`} className={styles.outline} />

        {/* Dimension lines: cap height, line step, overall width */}
        <g className={styles.dimension}>
          <path d={`M72 ${capOne}V${baseOne}M66 ${capOne}h12M66 ${baseOne}h12M68 ${capTwo}h8`} />
          <path d={`M104 ${baseOne}V${baseTwo}M98 ${baseOne}h12M98 ${baseTwo}h12`} />
          <path
            className={styles.extension}
            d={`M${left} ${baseOne + 8}V${WIDTH_LINE + 6}M${right} ${baseTwo + 6}V${WIDTH_LINE + 6}`}
          />
          <path
            d={`M${left} ${WIDTH_LINE}H${right}M${left} ${WIDTH_LINE - 6}v12M${right} ${WIDTH_LINE - 6}v12`}
          />
        </g>
        <NameDimensions />
      </svg>
    </span>
  );
}
