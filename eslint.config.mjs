import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Lets a component drop a prop before spreading the rest onto the DOM: const { iconOnly, ...props }
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // FSD public API: import slices only through their index.ts (Steiger checks the rest).
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/*/*/*/**'],
              message: 'Import FSD slices through their public API (index.ts), not deep paths.',
            },
          ],
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
  prettier,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**',
    'coverage/**',
    'storybook-static/**',
  ]),
]);
