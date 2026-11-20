import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Button, buttonClassName } from '@/shared/ui/button';
import { FileTextIcon, GithubIcon, LinkedinIcon, MailIcon } from '@/shared/ui/icons';

import { ButtonGroup } from './ButtonGroup';

/* Compositions follow kit sheet 01 Actions, §02 Button Group */

const meta = {
  title: 'Actions/Button Group',
  component: ButtonGroup,
  args: { 'aria-label': 'Case actions' },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Case actions: Secondary × N. Hover and active are forced on the 2nd and 3rd button. */
export const Horizontal: Story = {
  parameters: {
    pseudo: { hover: '[data-kit-state="hover"]', active: '[data-kit-state="active"]' },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Live</Button>
      <Button variant="secondary" data-kit-state="hover">
        Code
      </Button>
      <Button variant="secondary" data-kit-state="active">
        Figma
      </Button>
    </ButtonGroup>
  ),
};

/** The selected segment is raised out of the group */
export const Selected: Story = {
  render: (args) => (
    <ButtonGroup {...args} aria-label="Case view">
      <Button variant="secondary" aria-pressed="false">
        Overview
      </Button>
      <Button variant="secondary" aria-pressed="true">
        Code
      </Button>
      <Button variant="secondary" aria-pressed="false">
        Gallery
      </Button>
    </ButtonGroup>
  ),
};

/** "Field button" (EngRadar): Primary + Mono as links */
export const FieldButton: Story = {
  render: (args) => (
    <ButtonGroup {...args} aria-label="Hero actions">
      <a href="#" className={buttonClassName({ variant: 'primary' })}>
        View the work →
      </a>
      <a href="#" className={buttonClassName({ variant: 'mono' })}>
        Download CV
      </a>
    </ButtonGroup>
  ),
};

/** Social rail: vertical, Secondary icon buttons. Links follow sitemap.md G2 (no Telegram, DESIGN.md §9.2). */
export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} aria-label="Social links" orientation="vertical">
      <a
        href="#"
        aria-label="GitHub"
        className={buttonClassName({ variant: 'secondary', iconOnly: true })}
      >
        <GithubIcon />
      </a>
      <a
        href="#"
        aria-label="LinkedIn"
        className={buttonClassName({ variant: 'secondary', iconOnly: true })}
      >
        <LinkedinIcon />
      </a>
      <a
        href="#"
        aria-label="Email"
        className={buttonClassName({ variant: 'secondary', iconOnly: true })}
      >
        <MailIcon />
      </a>
      <a
        href="#"
        aria-label="CV (PDF)"
        className={buttonClassName({ variant: 'secondary', iconOnly: true })}
      >
        <FileTextIcon />
      </a>
    </ButtonGroup>
  ),
  play: async ({ canvas }) => {
    const group = canvas.getByRole('group', { name: 'Social links' });
    await expect(group).toHaveClass('cx-btngroup', 'cx-btngroup--v');
  },
};
