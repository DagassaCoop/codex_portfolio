import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { siteConfig } from '@/shared/config';
import { buttonClassName } from '@/shared/ui/button';

import { sendMessage } from '../api/sendMessage';
import { ContactForm } from './components/contact-form';
import { CopyEmail } from './components/copy-email';
import styles from './ContactSection.module.css';

const TITLE_ID = 'contact-title';

/**
 * Fol. 04, Contact (G3; Home page design): on every page, under the page's own sections. On the
 * left the invitation, the email to copy and the CV and profiles; on the right the form.
 * "Let's talk" everywhere links here (`#contact`).
 */
export function ContactSection() {
  const t = useTranslations('contact');
  const tLayout = useTranslations('layout');
  const { email, cv, linkedin, github } = siteConfig.links;

  return (
    <section id="contact" aria-labelledby={TITLE_ID} className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.folio}>
          <span className={clsx('cx-label', styles.folioNumber)}>{t('folio')}</span>
          <span className="cx-cap">{t('sheet')}</span>
        </div>
        <h2 id={TITLE_ID} className={clsx('cx-display', styles.title)}>
          {t('title')}
        </h2>
        <p className="cx-lead">{t('lead')}</p>

        <div className={styles.copy}>
          <CopyEmail email={email} />
        </div>

        <ul className={styles.links} aria-label={t('links.label')}>
          <li>
            <a href={cv} download className={buttonClassName({ variant: 'mono' })}>
              {t('links.cv')} <span aria-hidden="true">↓</span>
            </a>
          </li>
          <li>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tLayout('newTab', { label: t('links.linkedin') })}
              className={buttonClassName({ variant: 'mono' })}
            >
              {t('links.linkedin')} <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tLayout('newTab', { label: t('links.github') })}
              className={buttonClassName({ variant: 'mono' })}
            >
              {t('links.github')} <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.form}>
        <ContactForm send={sendMessage} email={email} labelledBy={TITLE_ID} />
      </div>
    </section>
  );
}
