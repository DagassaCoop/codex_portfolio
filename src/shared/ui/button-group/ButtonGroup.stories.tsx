import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FileText, Mail } from 'lucide-react';
import { expect } from 'storybook/test';

import { Button, buttonClassName } from '@/shared/ui/button';

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

/**
 * Social rail: vertical, Secondary icon buttons.
 * GitHub and LinkedIn icons are not in lucide-react 1.x, so this story shows Email and CV only.
 */
export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} aria-label="Social links" orientation="vertical">
      <a
        href="#"
        aria-label="Email"
        className={buttonClassName({ variant: 'secondary', iconOnly: true })}
      >
        <Mail strokeWidth={1.6} aria-hidden />
      </a>
      <a
        href="#"
        aria-label="CV (PDF)"
        className={buttonClassName({ variant: 'secondary', iconOnly: true })}
      >
        <FileText strokeWidth={1.6} aria-hidden />
      </a>
    </ButtonGroup>
  ),
  play: async ({ canvas }) => {
    const group = canvas.getByRole('group', { name: 'Social links' });
    await expect(group).toHaveClass('cx-btngroup', 'cx-btngroup--v');
  },
};
