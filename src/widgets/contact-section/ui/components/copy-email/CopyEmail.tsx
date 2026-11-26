'use client';

import { useTranslations } from 'next-intl';
import { useId, useRef } from 'react';

import { Field } from '@/shared/ui/field';
import { MailIcon } from '@/shared/ui/icons';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';
import { useToast } from '@/shared/ui/toast';

type CopyEmailProps = {
  email: string;
};

/**
 * The author's email in a read-only field with COPY (kit Input Group): copies it and confirms with
 * a toast (PROJECT_OVERVIEW.md §7). If the clipboard is blocked, the address is selected instead.
 */
export function CopyEmail({ email }: CopyEmailProps) {
  const t = useTranslations('contact.email');
  const toast = useToast();
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.show({ type: 'success', title: t('copied'), description: email });
    } catch {
      inputRef.current?.select();
      toast.show({ title: t('copied'), description: t('copyFailed') });
    }
  };

  return (
    <Field label={t('label')}>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput ref={inputRef} id={id} type="text" readOnly value={email} />
        <InputGroupButton aria-label={t('copyLabel')} onClick={copy}>
          {t('copy').toUpperCase()}
        </InputGroupButton>
      </InputGroup>
    </Field>
  );
}
