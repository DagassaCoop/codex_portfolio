'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { Controller, useForm, useWatch, type SubmitHandler } from 'react-hook-form';

import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field } from '@/shared/ui/field';
import { ArrowRightIcon } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import styles from './ContactForm.module.css';
import type { SendResult } from '../../../api/sendMessage';
import {
  contactDefaults,
  contactSchema,
  EMAIL_MAX,
  LINKS_MAX,
  MESSAGE_MAX,
  NAME_MAX,
  type ContactErrorKey,
  type ContactInput,
  type ContactMessage,
  type ContactSubmission,
} from '../../../model/contactSchema';

/** The limit each error message mentions ("Keep it under {max} characters.") */
const LIMITS: Record<ContactErrorKey, number | undefined> = {
  nameRequired: undefined,
  nameTooLong: NAME_MAX,
  emailInvalid: undefined,
  emailTooLong: EMAIL_MAX,
  messageRequired: undefined,
  messageTooLong: MESSAGE_MAX,
  messageLinks: LINKS_MAX,
};

type Status = 'editing' | 'failed' | 'sent';

type ContactFormProps = {
  /** The server action (`sendMessage`); stories pass a stand-in */
  send: (submission: ContactSubmission) => Promise<SendResult>;
  /** The author's address: the fallback when sending fails */
  email: string;
  /** The section's heading id: names the form */
  labelledBy: string;
};

/**
 * The contact form (DESIGN.md §4 composition, Home page design, Fol. 04): name, email, message with
 * a counter, optional consent, a hidden honeypot.
 *
 * Validation: React Hook Form with the zod `contactSchema`, checked when a field is left, then
 * as it changes; the server action checks the same schema again and its errors land on the fields.
 * States: editing → sending (fields disabled, button spinner) → sent (success panel) or failed
 * (error alert with the email).
 */
export function ContactForm({ send, email, labelledBy }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const id = useId();

  const [status, setStatus] = useState<Status>('editing');
  /** Waiting for the server: fields disabled, spinner in the button */
  const [sending, setSending] = useState(false);
  /** A field the server rejected, to focus when sending ends */
  const focusAfterSend = useRef<keyof ContactInput | null>(null);
  /** When the form was shown: the server takes a send within 3 s for a bot */
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const sentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactMessage>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
    mode: 'onTouched',
  });

  const messageLength = useWatch({ control, name: 'message' }).length;

  const errorText = (key: string | undefined) => {
    if (!key) return undefined;
    const errorKey = key as ContactErrorKey;
    return t(`errors.${errorKey}`, { max: LIMITS[errorKey] ?? 0 });
  };

  const submit: SubmitHandler<ContactMessage> = async (message, event) => {
    setStatus('editing');
    const form = event?.target;
    const website =
      form instanceof HTMLFormElement ? String(new FormData(form).get('website') ?? '') : '';
    let result: SendResult;
    setSending(true);
    try {
      result = await send({
        ...message,
        website,
        startedAt,
      });
    } catch {
      result = { ok: false, reason: 'failed' };
    } finally {
      setSending(false);
    }

    if (result.ok) {
      setStatus('sent');
      return;
    }
    if (result.reason === 'invalid') {
      const entries = Object.entries(result.fields) as [keyof ContactInput, ContactErrorKey][];
      entries.forEach(([field, key]) => setError(field, { type: 'server', message: key }));
      // The fields are still disabled here: focus the first one once they are back
      focusAfterSend.current = entries[0]?.[0] ?? null;
      return;
    }
    setStatus('failed');
  };

  /** Set by "Send another message": focus the first field once the form is back */
  const focusNameNext = useRef(false);

  const sendAnother = () => {
    reset(contactDefaults);
    setStartedAt(Date.now());
    focusNameNext.current = true;
    setStatus('editing');
  };

  useEffect(() => {
    if (sending || !focusAfterSend.current) return;
    setFocus(focusAfterSend.current);
    focusAfterSend.current = null;
  }, [sending, setFocus]);

  // Move focus with the state: to the confirmation, or back to the first field
  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
    if (status === 'editing' && focusNameNext.current) {
      focusNameNext.current = false;
      nameRef.current?.focus();
    }
  }, [status]);

  if (status === 'sent') {
    return (
      <div ref={sentRef} tabIndex={-1} className={`cx-panel ${styles.sent}`}>
        <Alert tone="success" title={t('sent.title')}>
          {t('sent.text')}
        </Alert>
        <div>
          <Button variant="link" onClick={sendAnother}>
            {t('sent.another')}
          </Button>
        </div>
      </div>
    );
  }

  const { ref: nameRegisterRef, ...nameField } = register('name');

  return (
    <form
      className={`cx-panel ${styles.form}`}
      aria-labelledby={labelledBy}
      noValidate
      onSubmit={(event) => handleSubmit(submit)(event)}
    >
      <Field label={t('name')} required disabled={sending} error={errorText(errors.name?.message)}>
        <Input
          {...nameField}
          ref={(element) => {
            nameRegisterRef(element);
            nameRef.current = element;
          }}
          autoComplete="name"
          placeholder={t('namePlaceholder')}
          maxLength={NAME_MAX}
          aria-required="true"
        />
      </Field>

      <Field
        label={t('email')}
        required
        disabled={sending}
        error={errorText(errors.email?.message)}
      >
        <Input
          {...register('email')}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t('emailPlaceholder')}
          maxLength={EMAIL_MAX}
          aria-required="true"
        />
      </Field>

      <Field
        label={t('message')}
        required
        disabled={sending}
        className={styles.wide}
        error={errorText(errors.message?.message)}
        counter={`${messageLength} / ${MESSAGE_MAX}`}
      >
        <Textarea
          {...register('message')}
          placeholder={t('messagePlaceholder')}
          maxLength={MESSAGE_MAX}
          aria-required="true"
        />
      </Field>

      {/* Honeypot: people never see or reach it; a bot that fills it in gets a quiet success */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor={`${id}-website`}>{t('honeypot')}</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {status === 'failed' && (
        <Alert tone="error" title={t('failed.title')} className={styles.wide}>
          {t.rich('failed.text', {
            email: () => (
              <a href={`mailto:${email}`} className="cx-tlink">
                {email}
              </a>
            ),
          })}
        </Alert>
      )}

      <div className={styles.footer}>
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              name={field.name}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
              inputRef={field.ref}
              disabled={sending}
            >
              {t('consent')}
            </Checkbox>
          )}
        />
        <Button variant="primary" type="submit" loading={sending}>
          {sending ? t('sending') : t('submit')}
          {!sending && <ArrowRightIcon />}
        </Button>
      </div>
    </form>
  );
}
