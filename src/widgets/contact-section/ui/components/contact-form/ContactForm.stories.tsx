import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ComponentProps } from 'react';
import { expect, fn, waitFor, type Mock } from 'storybook/test';

import { ContactForm } from './ContactForm';
import type { SendResult } from '../../../api/sendMessage';

/*
 * The real contact form (G3) with a stand-in for the server action: each story decides what the
 * "server" answers. Validation is React Hook Form + the zod contactSchema.
 */

type ContactFormProps = ComponentProps<typeof ContactForm>;

const EMAIL = 'hello@example.com';

const answer = (result: SendResult, delay = 0) =>
  fn(
    () =>
      new Promise<SendResult>((resolve) => {
        setTimeout(() => resolve(result), delay);
      }),
  );

const meta = {
  title: 'Widgets/Contact form',
  component: ContactForm,
  parameters: { layout: 'padded' },
  args: { send: answer({ ok: true }), email: EMAIL, labelledBy: 'contact-title' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <h2 id="contact-title" className="cx-h2">
          Let’s build the next one.
        </h2>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const RequiredFields: Story = {
  name: 'Test · sending an empty form shows every error and focuses the first',
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));

    await expect(await canvas.findByText('Tell me how to address you.')).toBeVisible();
    await expect(canvas.getByText('Add a full address, e.g. jane@acme.com')).toBeVisible();
    await expect(canvas.getByText('A few words are enough.')).toBeVisible();

    const name = canvas.getByRole('textbox', { name: /Name/ });
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toHaveFocus();
    // The error is linked to its field
    await expect(name).toHaveAccessibleDescription(/Tell me how to address you/);
    await expect(args.send).not.toHaveBeenCalled();
  },
};

export const ValidatesOnLeave: Story = {
  name: 'Test · a field is checked when left, then while it is fixed',
  play: async ({ canvas, userEvent }) => {
    const email = canvas.getByRole('textbox', { name: /Email/ });
    await userEvent.type(email, 'jane@');
    await expect(canvas.queryByText('Add a full address, e.g. jane@acme.com')).toBeNull();

    await userEvent.tab();
    await expect(await canvas.findByText('Add a full address, e.g. jane@acme.com')).toBeVisible();

    await userEvent.type(email, 'acme.com');
    await waitFor(() =>
      expect(canvas.queryByText('Add a full address, e.g. jane@acme.com')).toBeNull(),
    );
    await expect(email).not.toHaveAttribute('aria-invalid', 'true');
  },
};

export const LimitsAndCounter: Story = {
  name: 'Test · the counter follows the message; too many links are refused',
  play: async ({ canvas, userEvent }) => {
    const message = canvas.getByRole('textbox', { name: /Message/ });
    await expect(message).toHaveAttribute('maxlength', '1000');
    await userEvent.type(message, 'Hello');
    await expect(canvas.getByText('5 / 1000')).toBeVisible();

    await userEvent.clear(message);
    await userEvent.type(message, 'a http://1 http://2 http://3 http://4');
    await userEvent.tab();
    await expect(await canvas.findByText('Up to 3 links, please.')).toBeVisible();
  },
};

const fill = async (
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
  userEvent: Parameters<NonNullable<Story['play']>>[0]['userEvent'],
) => {
  await userEvent.type(canvas.getByRole('textbox', { name: /Name/ }), '  Jane Cooper ');
  await userEvent.type(canvas.getByRole('textbox', { name: /Email/ }), 'jane@acme.com');
  await userEvent.type(canvas.getByRole('textbox', { name: /Message/ }), 'A landing page.');
  await userEvent.click(canvas.getByRole('checkbox', { name: /Use my data/ }));
};

export const Sends: Story = {
  name: 'Test · a valid form is sent, then confirmed',
  args: { send: answer({ ok: true }, 300) },
  play: async ({ args, canvas, userEvent }) => {
    await fill(canvas, userEvent);
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));

    // While sending: the button keeps its place with a spinner, the fields are disabled
    await expect(await canvas.findByRole('button', { name: /Sending/ })).toBeVisible();
    await expect(canvas.getByRole('textbox', { name: /Message/ })).toBeDisabled();

    await expect(await canvas.findByRole('status')).toHaveTextContent('Message sent');
    await expect(args.send).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Jane Cooper',
        email: 'jane@acme.com',
        message: 'A landing page.',
        consent: true,
        website: '',
      }),
    );
    // When the form was shown, for the server's 3 s check
    const [submission] = (args.send as Mock<ContactFormProps['send']>).mock.calls[0] ?? [];
    await expect(typeof submission?.startedAt).toBe('number');

    // "Send another message" brings back an empty form, focus on the name
    await userEvent.click(canvas.getByRole('button', { name: 'Send another message' }));
    const name = await canvas.findByRole('textbox', { name: /Name/ });
    await expect(name).toHaveValue('');
    await expect(name).toHaveFocus();
  },
};

export const SendFails: Story = {
  name: 'Test · a failed send keeps the form and offers the email',
  args: { send: answer({ ok: false, reason: 'failed' }) },
  play: async ({ canvas, userEvent }) => {
    await fill(canvas, userEvent);
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));

    const alert = await canvas.findByRole('alert');
    await expect(alert).toHaveTextContent('ERR — Message not sent');
    await expect(canvas.getByRole('link', { name: EMAIL })).toHaveAttribute(
      'href',
      `mailto:${EMAIL}`,
    );
    // What was typed stays
    await expect(canvas.getByRole('textbox', { name: /Name/ })).toHaveValue('  Jane Cooper ');
  },
};

export const ServerRejects: Story = {
  name: 'Test · errors from the server land on their fields',
  args: { send: answer({ ok: false, reason: 'invalid', fields: { email: 'emailTooLong' } }) },
  play: async ({ canvas, userEvent }) => {
    await fill(canvas, userEvent);
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));

    await expect(await canvas.findByText('This address is too long.')).toBeVisible();
    await expect(canvas.getByRole('textbox', { name: /Email/ })).toHaveFocus();
  },
};

export const Honeypot: Story = {
  name: 'Test · the honeypot is out of reach',
  play: async ({ canvasElement }) => {
    const trap = canvasElement.querySelector<HTMLInputElement>('input[name="website"]');
    await expect(trap).not.toBeNull();
    await expect(trap).toHaveAttribute('tabindex', '-1');
    await expect(trap?.closest('[aria-hidden="true"]')).not.toBeNull();
  },
};
