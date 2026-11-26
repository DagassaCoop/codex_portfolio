import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // TODO(M6): remove once the About page shows the experience too (the slice's second consumer).
    files: ['./src/entities/experience/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
