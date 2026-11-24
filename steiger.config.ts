import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // TODO(M4): remove once the Work page lists the projects too (the slice's second consumer).
    files: ['./src/entities/project/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
  {
    // TODO(M6): remove once the About page shows the experience too (the slice's second consumer).
    files: ['./src/entities/experience/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
