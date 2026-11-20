import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { pseudoStateParameters, StateMatrix } from '@/shared/lib/storybook';
import { Field } from '@/shared/ui/field';

import { NativeSelect } from './NativeSelect';

/* States follow kit sheet 02 Forms, §01 (row "Native Select"). Options: contact form request types. */

function RequestTypeOptions() {
  return (
    <>
      <option value="job">Job offer</option>
      <option value="freelance">Freelance</option>
      <option value="question">Question</option>
      <option value="other">Other</option>
    </>
  );
}

const meta = {
  title: 'Forms/Native Select',
  component: NativeSelect,
  args: { 'aria-label': 'Request type', disabled: false, children: <RequestTypeOptions /> },
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { layout: 'padded', ...pseudoStateParameters },
  render: () => (
    <StateMatrix
      label="Component"
      states={['default', 'hover', 'typing', 'focus', 'disabled']}
      rows={[
        {
          name: 'Native Select',
          note: 'mobile-friendly',
          render: (state) => (
            <NativeSelect aria-label={`Request type, ${state}`} disabled={state === 'disabled'}>
              <RequestTypeOptions />
            </NativeSelect>
          ),
        },
      ]}
    />
  ),
};

export const InField: Story = {
  name: 'Test · labelled by the Field, value changes',
  render: () => (
    <div style={{ width: 320 }}>
      <Field label="Request type">
        <NativeSelect name="type" defaultValue="job">
          <RequestTypeOptions />
        </NativeSelect>
      </Field>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByRole('combobox', { name: 'Request type' });
    await userEvent.selectOptions(select, 'freelance');
    await expect(select).toHaveValue('freelance');
  },
};
