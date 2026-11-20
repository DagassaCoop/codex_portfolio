import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect, useRef } from 'react';
import { expect, screen, waitFor, within } from 'storybook/test';

import { Button } from '@/shared/ui/button';

import { ToastProvider, useToast } from './Toast';

/*
 * Follows kit sheet 05 Overlays & feedback, §06 Toast: bottom right, 4s.
 * "hello@[your-domain]" is the sheet's placeholder email.
 */

function CopyEmailDemo() {
  const toast = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.show({ type: 'success', title: 'Copied', description: 'hello@[your-domain]' })
      }
    >
      Copy email
    </Button>
  );
}

/** The kinds from the sheet (success, loading, with an action); they stay until dismissed */
function AllKindsDemo() {
  const toast = useToast();
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    shown.current = true;
    toast.show({
      type: 'success',
      title: 'Copied',
      description: 'hello@[your-domain]',
      timeout: 0,
    });
    toast.show({ type: 'loading', title: 'Sending', description: 'Folding the letter…' });
    toast.show({
      type: 'accent',
      title: 'Draft saved',
      description: 'Your message is kept locally.',
      action: { label: 'Undo', onClick: () => {} },
      timeout: 0,
    });
  }, [toast]);

  return <span className="cx-small">Toasts are in the bottom-right corner.</span>;
}

const meta = {
  title: 'Feedback/Toast',
  component: CopyEmailDemo,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ToastProvider dismissLabel="Dismiss">
        <div style={{ padding: 24, minHeight: 480 }}>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof CopyEmailDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CopyEmail: Story = {};

export const AllKinds: Story = { render: () => <AllKindsDemo /> };

export const ShowAndDismiss: Story = {
  name: 'Test · show on action, dismiss closes it',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Copy email' }));

    // Toasts render in a portal, outside the story root
    const label = await screen.findByText('Copied');
    const toastElement = label.closest<HTMLElement>('.cx-toast')!;
    await expect(toastElement).toHaveAttribute('data-type', 'success');
    // Visible once the 160ms enter transition (fade + shift) has run
    await waitFor(() =>
      expect(within(toastElement).getByText('hello@[your-domain]')).toBeVisible(),
    );

    // Base UI hides the dismiss button from screen readers (aria-hidden) but keeps it in the tab order
    await userEvent.click(within(toastElement).getByLabelText('Dismiss'));
    await waitFor(() => expect(screen.queryByText('Copied')).toBeNull());
  },
};
