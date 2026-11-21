import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { siteConfig } from '@/shared/config';
import { routing } from '@/shared/i18n';
import { fontVariables } from '@/shared/styles';
import { FooterStamp } from '@/widgets/footer-stamp';
import { Header, Monogram } from '@/widgets/header';
import { MobileMenu } from '@/widgets/mobile-menu';
import { SocialRail } from '@/widgets/social-rail';

import { PageFrame } from './PageFrame';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: t('title'),
    description: t('description'),
  };
}

export async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          <PageFrame
            monogram={<Monogram />}
            rail={<SocialRail />}
            header={<Header menu={<MobileMenu />} />}
            footer={<FooterStamp />}
          >
            {children}
          </PageFrame>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
