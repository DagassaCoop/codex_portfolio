import { beforeEach, describe, expect, it, vi } from 'vitest';

import { deliverContactMessage } from './deliver.server';
import { sendMessage } from './sendMessage';

vi.mock('server-only', () => ({}));
vi.mock('next-intl/server', () => ({ getLocale: async () => 'fr' }));
vi.mock('./deliver.server', () => ({ deliverContactMessage: vi.fn() }));

const deliver = vi.mocked(deliverContactMessage);

/** A form filled in by a person: shown 10 s ago, honeypot empty */
const submission = () => ({
  name: ' Jane Cooper ',
  email: 'jane@acme.com',
  message: 'Hello',
  consent: true,
  website: '',
  startedAt: Date.now() - 10_000,
});

describe('sendMessage', () => {
  beforeEach(() => {
    deliver.mockReset();
  });

  it('delivers a valid message, trimmed, with the page locale', async () => {
    await expect(sendMessage(submission())).resolves.toEqual({ ok: true });
    expect(deliver).toHaveBeenCalledWith({
      name: 'Jane Cooper',
      email: 'jane@acme.com',
      message: 'Hello',
      consent: true,
      locale: 'fr',
    });
  });

  it('returns the schema errors by field and sends nothing', async () => {
    const result = await sendMessage({ ...submission(), name: '', email: 'jane@' });
    expect(result).toEqual({
      ok: false,
      reason: 'invalid',
      fields: { name: 'nameRequired', email: 'emailInvalid' },
    });
    expect(deliver).not.toHaveBeenCalled();
  });

  it('rejects input that is not a form at all', async () => {
    await expect(sendMessage('hello')).resolves.toMatchObject({ ok: false, reason: 'invalid' });
    expect(deliver).not.toHaveBeenCalled();
  });

  it('answers a filled honeypot with a quiet success and sends nothing', async () => {
    await expect(sendMessage({ ...submission(), website: 'https://spam' })).resolves.toEqual({
      ok: true,
    });
    expect(deliver).not.toHaveBeenCalled();
  });

  it('answers a form sent within 3 s with a quiet success and sends nothing', async () => {
    await expect(sendMessage({ ...submission(), startedAt: Date.now() - 1000 })).resolves.toEqual({
      ok: true,
    });
    expect(deliver).not.toHaveBeenCalled();
  });

  it('answers a bot before checking its data: quiet success, even when invalid', async () => {
    await expect(
      sendMessage({ ...submission(), name: '', email: 'x', website: 'https://spam' }),
    ).resolves.toEqual({ ok: true });
    expect(deliver).not.toHaveBeenCalled();
  });

  it('reports a delivery failure', async () => {
    deliver.mockRejectedValueOnce(new Error('down'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(sendMessage(submission())).resolves.toEqual({ ok: false, reason: 'failed' });
  });
});
