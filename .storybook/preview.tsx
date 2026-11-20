import type { Decorator, Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import { type ReactNode, useEffect } from 'react';
import * as pseudoStates from 'storybook-addon-pseudo-states/preview';

import { fontVariables } from '@/shared/styles';

import messages from '../messages/en.json';

/**
 * next/font defines the --font-* variables through class names. The tokens in :root read them,
 * so the classes must sit on <html>, exactly as in src/app/layouts/LocaleLayout.tsx.
 */
function FontVariablesOnHtml({ children }: { children: ReactNode }) {
  useEffect(() => {
    const classes = fontVariables.split(' ');
    document.documentElement.classList.add(...classes);
    return () => document.documentElement.classList.remove(...classes);
  }, []);

  return children;
}

const withFonts: Decorator = (Story) => (
  <FontVariablesOnHtml>
    <Story />
  </FontVariablesOnHtml>
);

const withIntl: Decorator = (Story) => (
  <NextIntlClientProvider locale="en" messages={messages}>
    <Story />
  </NextIntlClientProvider>
);

const preview: Preview = {
  // pseudo-states is not picked up from main.ts `addons` for the preview, so its decorator is registered here.
  // It forces :hover / :active / :focus-visible via `parameters.pseudo` to show the kit's frozen states.
  decorators: [...pseudoStates.decorators, withFonts, withIntl],
  initialGlobals: { ...pseudoStates.initialGlobals },
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
