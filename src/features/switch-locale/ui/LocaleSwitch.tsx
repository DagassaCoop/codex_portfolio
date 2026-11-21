'use client';

import { hasLocale, useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { routing, usePathname, useRouter } from '@/shared/i18n';
import { Toggle } from '@/shared/ui/toggle';
import { ToggleGroup } from '@/shared/ui/toggle-group';

type LocaleSwitchProps = {
  className?: string;
};

/**
 * EN | FR switch (DESIGN.md §3, Toggle Group). Opens the same page in the other language.
 * The current language is the pressed item; pressing it again does nothing.
 */
export function LocaleSwitch({ className }: LocaleSwitchProps) {
  const t = useTranslations('layout.locale');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  function switchTo(next: string | undefined) {
    if (!next || next === locale || !hasLocale(routing.locales, next)) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  }

  return (
    <ToggleGroup
      aria-label={t('label')}
      value={[locale]}
      onValueChange={([next]) => switchTo(next)}
      className={className}
    >
      {routing.locales.map((item) => (
        <Toggle key={item} value={item} lang={item}>
          {item.toUpperCase()}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
