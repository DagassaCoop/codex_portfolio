/**
 * The site's sections, in navigation order (header, mobile menu).
 * Titles are translated: messages `layout.nav.<key>`. `folio` is the section's folio number (decor).
 */
export const navigation = [
  { key: 'home', href: '/', folio: '01' },
  { key: 'projects', href: '/projects', folio: '02' },
  { key: 'about', href: '/about', folio: '03' },
] as const;
