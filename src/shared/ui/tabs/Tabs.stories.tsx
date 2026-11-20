import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Tab, Tabs, TabsList, TabsPanel } from './Tabs';

/* Follows kit sheet 03 Navigation, §02 Tabs: Fol. 03 — Skills / Experience / Education */

function AboutTabs() {
  return (
    <Tabs defaultValue="experience">
      <TabsList aria-label="About">
        <Tab value="skills" count="12">
          Skills
        </Tab>
        <Tab value="experience" count="04">
          Experience
        </Tab>
        <Tab value="education">Education</Tab>
      </TabsList>
      <TabsPanel value="skills">
        <p className="cx-body">TypeScript, React, Vue, Node.js, design systems.</p>
      </TabsPanel>
      <TabsPanel value="experience">
        <p className="cx-body">
          Frontend Developer at BrightIT · Soft2Bet — shared business logic and a UI Kit library.
        </p>
      </TabsPanel>
      <TabsPanel value="education">
        <p className="cx-body">BSc Computer Science.</p>
      </TabsPanel>
    </Tabs>
  );
}

const meta = {
  title: 'Navigation/Tabs',
  component: AboutTabs,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof AboutTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const About: Story = {};

/** Every tab state in one list: selected, default, hover, active, focus, disabled */
export const States: Story = {
  render: () => (
    <Tabs defaultValue="selected">
      <TabsList aria-label="Tab states">
        <Tab value="selected" count="01">
          Selected
        </Tab>
        <Tab value="default">Default</Tab>
        <Tab value="hover" data-kit-state="hover">
          Hover
        </Tab>
        <Tab value="active" data-kit-state="active">
          Active
        </Tab>
        <Tab value="focus" data-kit-state="focus">
          Focus
        </Tab>
        <Tab value="disabled" disabled>
          Disabled
        </Tab>
      </TabsList>
    </Tabs>
  ),
  parameters: {
    pseudo: {
      hover: '[data-kit-state="hover"]',
      active: '[data-kit-state="active"]',
      focusVisible: '[data-kit-state="focus"]',
    },
  },
};

export const KeyboardSwitch: Story = {
  name: 'Test · arrows switch tabs and panels',
  play: async ({ canvas, userEvent }) => {
    const experience = canvas.getByRole('tab', { name: /Experience/ });
    await expect(experience).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel', { name: /Experience/ })).toHaveTextContent(
      /BrightIT/,
    );

    experience.focus();
    await userEvent.keyboard('{ArrowRight}');
    const education = canvas.getByRole('tab', { name: 'Education' });
    await expect(education).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(education).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel', { name: 'Education' })).toHaveTextContent(/BSc/);
  },
};
