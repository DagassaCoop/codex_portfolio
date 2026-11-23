'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './NameDimensions.module.css';
import { EDGES, GUIDES, MAX_WIDTH, VIEW_BOX } from '../../constructedName.paths';

const { capOne, capTwo, baseOne, baseTwo } = GUIDES;

/** Before JS (and on the server) the labels show the sizes at the drawing's widest */
const START_SCALE = MAX_WIDTH / VIEW_BOX.width;

const px = (units: number, scale: number) => Math.round(units * scale);

/**
 * The dimension labels of the constructed name, in the px the drawing is rendered at:
 * cap height, the step from one baseline to the next, the overlap of line I's baseline and
 * line II's cap line, and the overall width. They follow the drawing's width as it resizes.
 *
 * Renders inside the name's `<svg>`.
 */
export function NameDimensions() {
  const ref = useRef<SVGGElement>(null);
  const [scale, setScale] = useState(START_SCALE);

  useEffect(() => {
    const svg = ref.current?.ownerSVGElement;
    if (!svg) return;

    const observer = new ResizeObserver(() => {
      const width = svg.getBoundingClientRect().width;
      if (width > 0) setScale(width / VIEW_BOX.width);
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  const capMiddle = (capOne + baseOne) / 2;
  const stepMiddle = (baseOne + baseTwo) / 2;

  return (
    <g ref={ref} className={styles.labels}>
      <text x="64" y={capMiddle} transform={`rotate(-90 64 ${capMiddle})`} textAnchor="middle">
        CAP {px(baseOne - capOne, scale)} PX
      </text>
      <text x="96" y={stepMiddle} transform={`rotate(-90 96 ${stepMiddle})`} textAnchor="middle">
        Δy {px(baseTwo - baseOne, scale)} PX
      </text>
      <text x="62" y={(capTwo + baseOne) / 2 + 3} textAnchor="end" className={styles.overlap}>
        {px(baseOne - capTwo, scale)}
      </text>
      <text x={(EDGES.left + EDGES.right) / 2} y="492.93" textAnchor="middle">
        WIDTH {px(EDGES.right - EDGES.left, scale)} PX
      </text>
    </g>
  );
}
