/**
 * Whether a link points to the page that is open (paths without the locale, from `usePathname`):
 * the same path or a page inside it ("/work" is current on "/work/some-case"); "/" only on "/".
 */
export function isCurrentPath(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}
