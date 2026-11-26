import 'server-only';

import type { ContactMessage } from '../model/contactSchema';

/** A message ready to send, with the page's language for the auto-reply */
export type Delivery = ContactMessage & { locale: string };

export class DeliveryNotConfiguredError extends Error {
  constructor() {
    super('Email delivery is not configured (stage 2 of M7: Resend).');
    this.name = 'DeliveryNotConfiguredError';
  }
}

/**
 * Sends the message on: a notification to the author and an auto-reply to the sender.
 *
 * TODO(M7 stage 2): send with Resend + React Email (PROJECT_OVERVIEW.md §7). Until then:
 * in development the message is logged and counts as sent; in production it fails, so the form
 * shows its error with the email as a fallback, instead of pretending to deliver.
 */
export async function deliverContactMessage(delivery: Delivery): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[contact] message (not sent, delivery comes in M7 stage 2):', delivery);
    return;
  }
  throw new DeliveryNotConfiguredError();
}
