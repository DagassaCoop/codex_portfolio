'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LocaleSwitch } from '@/features/switch-locale';
import { navigation } from '@/shared/config';
import { buttonClassName } from '@/shared/ui/button';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';
import { MenuIcon } from '@/shared/ui/icons';
import { SheetFooter, SheetHeader, SheetNav, SheetNavLink, SheetPopup } from '@/shared/ui/sheet';

import styles from './MobileMenu.module.css';

/**
 * The menu for tablets and phones (Home page design, G1; DESIGN.md §7 Sheet).
 *
 * A Secondary icon button, shown at 1024px and below, opens a Sheet from the right:
 * the sections with their folio numbers, the language switch and "Let's talk".
 * Choosing a section or "Let's talk" closes it.
 */
export function MobileMenu() {
  const t = useTranslations('layout');
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger iconOnly aria-label={t('menu.open')} className={styles.trigger}>
        <MenuIcon />
      </DialogTrigger>

      <SheetPopup aria-label={t('menu.label')}>
        <SheetHeader label={t('menu.heading')} closeLabel={t('menu.close')} />

        <SheetNav aria-label={t('nav.label')}>
          {navigation.map(({ key, href, folio }) => (
            <SheetNavLink key={key} href={href} meta={`FOL. ${folio}`} onClick={close}>
              {t(`nav.${key}`)}
            </SheetNavLink>
          ))}
        </SheetNav>

        <SheetFooter>
          <LocaleSwitch className={styles.locale} />
          {/* The contact section (Fol. 04) is on every page; it is not built yet (M7) */}
          <a href="#contact" className={buttonClassName({ variant: 'primary' })} onClick={close}>
            {t('header.letsTalk')}
          </a>
        </SheetFooter>
      </SheetPopup>
    </Dialog>
  );
}
