import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';

import { NavBar, NavLink } from './NavLink';

/*
 * States follow kit sheet 03 Navigation, §01. Nav items follow sitemap.md G1 (the sheet's
 * Work / About / Stack / Notes / Contact are a demo, DESIGN.md §5). The URL is set to /en/work,
 * so "Work" is the current page.
 */

const onWorkPage = { nextjs: { appDirectory: true, navigation: { pathname: '/en/work' } } };

function PrimaryNav() {
  return (
    <NavBar aria-label="Primary">
      <NavLink href="/work" count="06">
        Work
      </NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/#contact">Contact</NavLink>
    </NavBar>
  );
}

const meta = {
  title: 'Navigation/Nav link',
  component: PrimaryNav,
  parameters: onWorkPage,
} satisfies Meta<typeof PrimaryNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Header: Story = {};

export const States: Story = {
  parameters: { layout: 'padded', ...onWorkPage, ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Component"
      states={['default', 'hover', 'active', 'on', 'focus', 'disabled']}
      rows={[
        {
          name: 'Nav link',
          note: 'on = current page',
          render: (state) => (
            <NavLink href="/about" current={state === 'on'} disabled={state === 'disabled'}>
              About
            </NavLink>
          ),
        },
      ]}
    />
  ),
};

export const CurrentFromUrl: Story = {
  name: 'Test · current page comes from the URL',
  play: async ({ canvas }) => {
    const work = canvas.getByRole('link', { name: /Work/ });
    await expect(work).toHaveAttribute('aria-current', 'page');
    await expect(work).toHaveAttribute('href', '/en/work');
    await expect(canvas.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
    await expect(canvas.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  },
};
