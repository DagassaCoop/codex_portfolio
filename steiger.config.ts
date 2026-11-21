import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // TODO(M2 stage 5): remove once the mobile menu uses the locale switch too (its second consumer).
    files: ['./src/features/switch-locale/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
