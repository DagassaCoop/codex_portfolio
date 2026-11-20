import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ComponentType } from 'react';
import { expect } from 'storybook/test';

import type { IconProps } from './Icon';
import styles from './Icons.stories.module.css';
import * as iconModule from './index';

/* Every <Name>Icon exported from the public API, without the base `Icon` */
const entries = Object.entries(iconModule).filter(
  ([name]) => name.endsWith('Icon') && name !== 'Icon',
) as [string, ComponentType<IconProps>][];

function Gallery() {
  return (
    <ul role="list" className={styles.grid}>
      {entries.map(([name, IconComponent]) => (
        <li key={name} className={styles.tile}>
          <IconComponent />
          <code className="cx-icode">{name}</code>
        </li>
      ))}
    </ul>
  );
}

const meta = {
  title: 'Foundations/Icons',
  component: Gallery,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Gallery>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Every icon in the project. Stroke 1.6 on a 24 grid, no fills (DESIGN.md §0.7). */
export const All: Story = {
  play: async ({ canvasElement }) => {
    const svgs = canvasElement.querySelectorAll('svg');
    await expect(svgs).toHaveLength(entries.length);
    for (const svg of svgs) {
      await expect(svg).toHaveAttribute('stroke-width', '1.6');
      await expect(svg).toHaveAttribute('fill', 'none');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    }
  },
};

/** A standalone icon that carries meaning gets a name and role="img" */
export const Labelled: Story = {
  render: () => <iconModule.MailIcon aria-label="Email" />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Email' })).toBeVisible();
  },
};
