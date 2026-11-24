import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import styles from './SpecTable.module.css';

/** Italian caption, part of the drawing layer: not translated (context/SITEMAP.md) */
const CAPTION = 'Tav. — specifica dell’autore';

type RowKey = 'experience' | 'brands' | 'projects' | 'performance' | 'countries' | 'education';

/** Rows in order; `accent`: the one highlighted value, `text`: a value in words, `note`: a line under the label */
const ROWS: { key: RowKey; accent?: boolean; text?: boolean; note?: boolean }[] = [
  { key: 'experience' },
  { key: 'brands' },
  { key: 'projects' },
  { key: 'performance', accent: true },
  { key: 'countries', note: true },
  { key: 'education', text: true },
];

type SpecTableProps = {
  className?: string;
};

/**
 * The author's spec sheet (kit Table): a figure per row, the best one in sanguine
 * (Home page design, section 1.4).
 */
export function SpecTable({ className }: SpecTableProps) {
  const t = useTranslations('home.experience.spec');

  return (
    <div className={className}>
      <Table caption={CAPTION}>
        <TableHead>
          <TableRow>
            <TableHeader>{t('spec')}</TableHeader>
            <TableHeader numeric>{t('value')}</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {ROWS.map(({ key, accent, text, note }) => (
            <TableRow key={key}>
              <TableCell>
                {t(`rows.${key}.label`)}
                {note && <span className={styles.note}>{t(`rows.countries.note`)}</span>}
              </TableCell>
              <TableCell
                numeric
                className={clsx(text ? styles.text : styles.figure, accent && styles.accent)}
              >
                {t(`rows.${key}.value`)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
