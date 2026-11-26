import { z } from 'zod';

/**
 * The contact form's data (context/SITEMAP.md G3; PROJECT_OVERVIEW.md §7): one schema for the
 * client (React Hook Form) and the server action, so both check the same rules.
 *
 * Error messages are keys of `contact.form.errors` in `messages`, translated by the form.
 */

export const NAME_MAX = 100;
export const EMAIL_MAX = 254;
export const MESSAGE_MAX = 1000;
/** More links than this in a message reads as spam */
export const LINKS_MAX = 3;

/** Keys of `contact.form.errors` */
export type ContactErrorKey =
  | 'nameRequired'
  | 'nameTooLong'
  | 'emailInvalid'
  | 'emailTooLong'
  | 'messageRequired'
  | 'messageTooLong'
  | 'messageLinks';

const error = (key: ContactErrorKey) => ({ error: key });

const LINK = /https?:\/\/|www\./gi;
const countLinks = (text: string) => text.match(LINK)?.length ?? 0;

export const contactSchema = z.object({
  name: z.string().trim().min(1, error('nameRequired')).max(NAME_MAX, error('nameTooLong')),
  email: z
    .string()
    .trim()
    .max(EMAIL_MAX, error('emailTooLong'))
    .pipe(z.email(error('emailInvalid'))),
  message: z
    .string()
    .trim()
    .min(1, error('messageRequired'))
    .max(MESSAGE_MAX, error('messageTooLong'))
    .refine((text) => countLinks(text) <= LINKS_MAX, error('messageLinks')),
  /** Optional: "Use my data only to reply to this message" */
  consent: z.boolean(),
});

/** What the form holds (before trimming) */
export type ContactInput = z.input<typeof contactSchema>;
/** What is sent (trimmed, checked) */
export type ContactMessage = z.output<typeof contactSchema>;

export const contactDefaults: ContactInput = {
  name: '',
  email: '',
  message: '',
  consent: false,
};

/** The fields of the form, for mapping server errors back onto them */
export const CONTACT_FIELDS = ['name', 'email', 'message', 'consent'] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

/**
 * What the server action receives: the form's values plus the spam checks' inputs.
 * - `website`: the honeypot, a field people never see; filled in means a bot.
 * - `startedAt`: when the form was shown (ms); sent in under 3 s means a bot.
 */
export const submissionSchema = contactSchema.extend({
  website: z.string().max(200).optional(),
  startedAt: z.number().int().nonnegative(),
});

export type ContactSubmission = z.input<typeof submissionSchema>;
