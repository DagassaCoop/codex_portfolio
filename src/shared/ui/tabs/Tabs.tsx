import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type TabsProps = Omit<BaseTabs.Root.Props, 'className'> & {
  className?: string;
};

/**
 * Kit tabs (DESIGN.md §5) on Base UI Tabs: TabsList with Tabs, then one TabsPanel per tab.
 * Arrow keys move between tabs; the selected tab gets a sanguine bar.
 *
 * @example
 * <Tabs defaultValue="experience">
 *   <TabsList aria-label="About">
 *     <Tab value="skills" count="12">Skills</Tab>
 *     <Tab value="experience" count="04">Experience</Tab>
 *   </TabsList>
 *   <TabsPanel value="skills">…</TabsPanel>
 *   <TabsPanel value="experience">…</TabsPanel>
 * </Tabs>
 */
export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root className={className} {...props} />;
}

export type TabsListProps = Omit<BaseTabs.List.Props, 'className'> & {
  /** What the tabs switch between, read by screen readers (translated): "About" */
  'aria-label': string;
  className?: string;
};

/** The row of tabs on a 1px ink baseline */
export function TabsList({ className, ...props }: TabsListProps) {
  return <BaseTabs.List className={clsx('cx-tabs', className)} {...props} />;
}

export type TabProps = Omit<BaseTabs.Tab.Props, 'className'> & {
  /** Small count after the label: "12" */
  count?: ReactNode;
  className?: string;
};

/** One tab. `value` links it to the TabsPanel with the same value. */
export function Tab({ count, className, children, ...props }: TabProps) {
  return (
    <BaseTabs.Tab className={clsx('cx-tab', className)} {...props}>
      {children}
      {count != null && <sup>{count}</sup>}
    </BaseTabs.Tab>
  );
}

export type TabsPanelProps = Omit<BaseTabs.Panel.Props, 'className'> & {
  className?: string;
};

/** The content shown while the tab with the same `value` is selected */
export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={clsx('cx-tabpanel', className)} {...props} />;
}
