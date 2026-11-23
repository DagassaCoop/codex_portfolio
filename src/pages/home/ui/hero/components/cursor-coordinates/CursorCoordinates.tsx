'use client';

import { useEffect, useRef, useState } from 'react';

/** Where the reading starts before the pointer moves, as on the Home design */
const START = { x: 412, y: 288 };

const pad = (value: number) => String(value).padStart(4, '0');

type CursorCoordinatesProps = {
  className?: string;
};

/**
 * "X 0412 · Y 0288": the pointer's position inside the enclosing section, in px (decor, `aria-hidden`).
 * Updates at most once per frame. Without JS, or on touch screens, it keeps the starting values.
 */
export function CursorCoordinates({ className }: CursorCoordinatesProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState(START);

  useEffect(() => {
    const area = ref.current?.closest('section');
    if (!area) return;

    let frame = 0;
    let pending = START;

    const onMove = (event: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      pending = {
        x: Math.max(0, Math.round(event.clientX - rect.left)),
        y: Math.max(0, Math.round(event.clientY - rect.top)),
      };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setPosition(pending);
      });
    };

    area.addEventListener('mousemove', onMove);
    return () => {
      area.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      X {pad(position.x)} · Y {pad(position.y)}
    </span>
  );
}
