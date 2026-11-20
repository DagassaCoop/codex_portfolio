import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/i18n';

export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and files with an extension (cv.pdf, favicons…)
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
