import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { NativeSelect } from '@/shared/ui/native-select';
import { Textarea } from '@/shared/ui/textarea';

import styles from './ContactForm.stories.module.css';
import { Field } from './Field';

/*
 * Composition from kit sheet 02 Forms, §07 (Fol. 04 · Contact), built only from foundation parts.
 * Fields follow sitemap.md G3 (DESIGN.md §4): name, email, request type, message with a counter,
 * optional consent. This is a layout demo; the real form is features/send-message (M7).
 */

const MAX_MESSAGE = 1000;

function ContactFormDemo({ showErrors = false }: { showErrors?: boolean }) {
  const [message, setMessage] = useState('');

  return (
    <form className={`cx-panel ${styles.form}`} aria-label="Contact" noValidate>
      <Field label="Name" required error={showErrors ? 'Tell me your name.' : undefined}>
        <Input name="name" placeholder="Jane Cooper" autoComplete="name" required />
      </Field>
      <Field label="Email" required error={showErrors ? 'Add a domain, e.g. acme.com' : undefined}>
        <Input
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
      </Field>
      <Field label="Request type">
        <NativeSelect name="type" defaultValue="job">
          <option value="job">Job offer</option>
          <option value="freelance">Freelance</option>
          <option value="question">Question</option>
          <option value="other">Other</option>
        </NativeSelect>
      </Field>
      <Field
        className={styles.wide}
        label="Message"
        required
        counter={`${message.length} / ${MAX_MESSAGE}`}
        error={showErrors ? 'A few words are enough.' : undefined}
      >
        <Textarea
          name="message"
          placeholder="Tell me about the project…"
          maxLength={MAX_MESSAGE}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </Field>
      <div className={styles.footer}>
        <Checkbox name="consent">Reply by email</Checkbox>
        <div className="cx-inline">
          <Button variant="ghost" type="reset" onClick={() => setMessage('')}>
            Clear
          </Button>
          <Button variant="primary" type="submit">
            Send message →
          </Button>
        </div>
      </div>
    </form>
  );
}

const meta = {
  title: 'Forms/Composition/Contact form',
  component: ContactFormDemo,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ContactFormDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithErrors: Story = { args: { showErrors: true } };

export const CounterFollowsMessage: Story = {
  name: 'Test · the counter follows the message',
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('textbox', { name: 'Message' }), 'Hello');
    await expect(canvas.getByText(`5 / ${MAX_MESSAGE}`)).toBeVisible();
  },
};
