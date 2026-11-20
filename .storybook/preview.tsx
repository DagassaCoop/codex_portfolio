import type { Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';

import messages from '../messages/en.json';

// TODO(foundation): import the global kit styles (tokens + cx- classes) here once they exist.

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: {
      // 'error' fails the story test on any axe violation (WCAG 2.2 AA target).
      test: 'error',
    },
  },
};

export default preview;
