import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    // Forces :hover / :active / :focus-visible in a story, to show the kit's frozen states
    'storybook-addon-pseudo-states',
  ],
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
};

export default config;
