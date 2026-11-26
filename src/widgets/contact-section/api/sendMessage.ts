'use server';

import { getLocale } from 'next-intl/server';
import { z } from 'zod';

import { deliverContactMessage } from './deliver.server';
import {
  CONTACT_FIELDS,
  submissionSchema,
  type ContactErrorKey,
  type ContactField,
} from '../model/contactSchema';

/** Faster than this from showing the form to sending it: a bot */
const MIN_FILL_MS = 3000;

export type SendResult =
  | { ok: true }
  /** The data failed the schema: errors by field, as `contact.form.errors` keys */
  | { ok: false; reason: 'invalid'; fields: Partial<Record<ContactField, ContactErrorKey>> }
  /** It could not be sent; the form offers the email instead */
  | { ok: false; reason: 'failed' };

/** Read first, before the form's own rules: the spam checks' inputs, whatever else was sent */
const spamSignals = z.object({
  website: z.unknown().optional(),
  startedAt: z.unknown().optional(),
});

const isField = (key: unknown): key is ContactField =>
  typeof key === 'string' && (CONTACT_FIELDS as readonly string[]).includes(key);

/**
 * The contact form's server action (PROJECT_OVERVIEW.md §7): spam checks first, then the same zod
 * schema as the form, then delivery. A bot gets a quiet success and nothing is sent.
 */
export async function sendMessage(input: unknown): Promise<SendResult> {
  const signals = spamSignals.safeParse(input);
  if (signals.success) {
    const { website, startedAt } = signals.data;
    const filledHoneypot = typeof website === 'string' && website !== '';
    const tooFast = typeof startedAt === 'number' && Date.now() - startedAt < MIN_FILL_MS;
    if (filledHoneypot || tooFast) return { ok: true };
  }

  const parsed = submissionSchema.safeParse(input);

  if (!parsed.success) {
    const fields: Partial<Record<ContactField, ContactErrorKey>> = {};
    for (const issue of parsed.error.issues) {
      const [key] = issue.path;
      if (isField(key) && !fields[key]) fields[key] = issue.message as ContactErrorKey;
    }
    return { ok: false, reason: 'invalid', fields };
  }

  const { website, startedAt, ...message } = parsed.data;

  try {
    await deliverContactMessage({ ...message, locale: await getLocale() });
    return { ok: true };
  } catch (error) {
    console.error('[contact] delivery failed:', error);
    return { ok: false, reason: 'failed' };
  }
}
