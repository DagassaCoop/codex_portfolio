import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

/* Rows and sample copy follow kit sheet 04 Data display, Table (the spec sheet) */

function SpecSheet() {
  return (
    <div style={{ width: 520 }}>
      <Table caption="Tav. I — specifica tecnica">
        <TableHead>
          <TableRow>
            <TableHeader>Spec</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader numeric>Rev.</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Stack</TableCell>
            <TableCell>React · TypeScript · Monorepo</TableCell>
            <TableCell numeric>A</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>3 devs + tech lead</TableCell>
            <TableCell numeric>B</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Deploy</TableCell>
            <TableCell>GitLab CI/CD</TableCell>
            <TableCell numeric>C</TableCell>
          </TableRow>
          <TableRow selected>
            <TableCell>Brands</TableCell>
            <TableCell>Selected row</TableCell>
            <TableCell numeric>D</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

const meta = {
  title: 'Data display/Table',
  component: SpecSheet,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SpecSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SpecSheetTable: Story = { name: 'Spec sheet' };

export const Structure: Story = {
  name: 'Test · headers, caption and the selected row',
  play: async ({ canvas, canvasElement }) => {
    const table = canvas.getByRole('table', { name: 'Tav. I — specifica tecnica' });
    await expect(table).toBeVisible();
    for (const header of canvas.getAllByRole('columnheader')) {
      await expect(header).toHaveAttribute('scope', 'col');
    }
    await expect(canvas.getByRole('columnheader', { name: 'Rev.' })).toHaveClass('num');
    const selected = canvasElement.querySelector('tr[data-selected]');
    await expect(selected).toHaveTextContent('Brands');
  },
};
