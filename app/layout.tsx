import type { ReactNode } from 'react';

// <html> and <body> are rendered by app/[locale]/layout.tsx (next-intl pattern).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
