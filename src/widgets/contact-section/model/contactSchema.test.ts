import { describe, expect, it } from 'vitest';

import { contactDefaults, contactSchema, LINKS_MAX, MESSAGE_MAX, NAME_MAX } from './contactSchema';

const valid = {
  name: 'Jane Cooper',
  email: 'jane@acme.com',
  message: 'Hello',
  consent: false,
} as const;

/** The error keys the schema gives, by field */
const errorsOf = (input: unknown) => {
  const result = contactSchema.safeParse(input);
  if (result.success) return {};
  return Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));
};

describe('contactSchema', () => {
  it('accepts a complete message and trims it', () => {
    const result = contactSchema.parse({ ...valid, name: '  Jane ', email: ' jane@acme.com ' });
    expect(result).toEqual({ ...valid, name: 'Jane', email: 'jane@acme.com' });
  });

  it('asks for name, email and message when the form is empty', () => {
    expect(errorsOf(contactDefaults)).toEqual({
      name: 'nameRequired',
      email: 'emailInvalid',
      message: 'messageRequired',
    });
  });

  it('treats spaces only as empty', () => {
    expect(errorsOf({ ...valid, name: '   ', message: ' \n ' })).toEqual({
      name: 'nameRequired',
      message: 'messageRequired',
    });
  });

  it.each(['jane', 'jane@', '@acme.com', 'jane@acme', 'jane acme@acme.com'])(
    'rejects the address %j',
    (email) => {
      expect(errorsOf({ ...valid, email })).toEqual({ email: 'emailInvalid' });
    },
  );

  it('caps the lengths', () => {
    expect(
      errorsOf({ ...valid, name: 'x'.repeat(NAME_MAX + 1), message: 'x'.repeat(MESSAGE_MAX + 1) }),
    ).toEqual({ name: 'nameTooLong', message: 'messageTooLong' });
    expect(errorsOf({ ...valid, email: `${'x'.repeat(250)}@acme.com` })).toEqual({
      email: 'emailTooLong',
    });
  });

  it(`allows up to ${LINKS_MAX} links in the message`, () => {
    const links = (count: number) =>
      Array.from({ length: count }, (_, i) => `https://example.com/${i}`).join(' ');
    expect(errorsOf({ ...valid, message: links(LINKS_MAX) })).toEqual({});
    expect(errorsOf({ ...valid, message: `${links(LINKS_MAX)} www.spam.com` })).toEqual({
      message: 'messageLinks',
    });
  });
});
