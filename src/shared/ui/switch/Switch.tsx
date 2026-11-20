import { Switch as BaseSwitch } from '@base-ui/react/switch';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type SwitchProps = Omit<BaseSwitch.Root.Props, 'className' | 'children'> & {
  /** The visible label next to the switch. It is also the switch's accessible name. */
  children: ReactNode;
  className?: string;
};

/**
 * Kit switch (DESIGN.md §3) on Base UI Switch: an on/off setting with a visible label.
 * The whole row is a <label>, so clicking the text toggles it; the row is at least 44px tall.
 *
 * @example
 * <Switch checked={liveOnly} onCheckedChange={setLiveOnly}>Live demos only</Switch>
 */
export function Switch({ children, className, disabled, ...props }: SwitchProps) {
  return (
    <label className={clsx('cx-switch-row', className)} data-disabled={disabled || undefined}>
      <BaseSwitch.Root className="cx-switch" disabled={disabled} {...props} />
      {children}
    </label>
  );
}
