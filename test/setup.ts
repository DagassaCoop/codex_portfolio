/*
 * Setup for the `unit` Vitest project (jsdom). Restored in M7: the M0 file was lost before the
 * first commit (PROGRESS.md, Known issues).
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
