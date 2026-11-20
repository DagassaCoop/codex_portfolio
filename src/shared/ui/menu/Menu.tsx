import { Menu as BaseMenu } from '@base-ui/react/menu';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { buttonClassName, type ButtonSize, type ButtonVariant } from '@/shared/ui/button';
import { ChevronDownIcon } from '@/shared/ui/icons';

import styles from './Menu.module.css';

/**
 * Kit dropdown menu (DESIGN.md §5) on Base UI Menu.
 * Arrow keys move the highlight, Enter / Space choose, Esc closes and returns focus to the trigger.
 *
 * @example
 * <Menu>
 *   <MenuTrigger variant="mono" size="sm">EN</MenuTrigger>
 *   <MenuPopup>
 *     <MenuRadioGroup label="Language" value={locale} onValueChange={setLocale}>
 *       <MenuRadioItem value="en" end="EN">English</MenuRadioItem>
 *       <MenuRadioItem value="fr" end="FR">Français</MenuRadioItem>
 *     </MenuRadioGroup>
 *   </MenuPopup>
 * </Menu>
 */
export function Menu(props: BaseMenu.Root.Props) {
  return <BaseMenu.Root {...props} />;
}

export type MenuTriggerProps = Omit<BaseMenu.Trigger.Props, 'className'> & {
  /** Looks like a kit button. The kit uses Mono `sm` for the language menu. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Chevron after the label; it turns 180° while the menu is open */
  chevron?: boolean;
  className?: string;
};

/** The button that opens the menu */
export function MenuTrigger({
  variant = 'mono',
  size = 'sm',
  chevron = true,
  className,
  children,
  ...props
}: MenuTriggerProps) {
  return (
    <BaseMenu.Trigger className={clsx(buttonClassName({ variant, size }), className)} {...props}>
      {children}
      {chevron && <ChevronDownIcon strokeWidth={2} className={styles.chevron} />}
    </BaseMenu.Trigger>
  );
}

export type MenuPopupProps = Omit<BaseMenu.Popup.Props, 'className'> & {
  /** Alignment to the trigger */
  align?: BaseMenu.Positioner.Props['align'];
  className?: string;
};

/** The floating panel (kit menu surface), 6px under the trigger */
export function MenuPopup({ align = 'start', className, ...props }: MenuPopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={6} align={align}>
        <BaseMenu.Popup className={clsx('cx-menu', className)} {...props} />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

type ItemContentProps = {
  /** Leading 16px icon */
  icon?: ReactNode;
  /** Right-aligned shortcut or note: "⌘C", <Kbd>E</Kbd>, "EN" */
  end?: ReactNode;
};

function ItemContent({ icon, end, children }: ItemContentProps & { children: ReactNode }) {
  return (
    <>
      {icon}
      {children}
      {end != null && <span className="cx-menu-end">{end}</span>}
    </>
  );
}

export type MenuItemProps = Omit<BaseMenu.Item.Props, 'className' | 'children'> &
  ItemContentProps & {
    children: ReactNode;
    /** Destructive action: error colour ("Reset sketch") */
    danger?: boolean;
    className?: string;
  };

/** An action. Use `onClick`; the menu closes after it. */
export function MenuItem({ icon, end, danger, className, children, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={clsx('cx-menu-item', danger && 'cx-menu-item--danger', className)}
      {...props}
    >
      <ItemContent icon={icon} end={end}>
        {children}
      </ItemContent>
    </BaseMenu.Item>
  );
}

export type MenuCheckboxItemProps = Omit<BaseMenu.CheckboxItem.Props, 'className' | 'children'> &
  ItemContentProps & {
    children: ReactNode;
    className?: string;
  };

/** An on / off option ("Mirror writing"); checked shows the sanguine dot */
export function MenuCheckboxItem({
  icon,
  end,
  className,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem className={clsx('cx-menu-item', className)} {...props}>
      <ItemContent icon={icon} end={end}>
        {children}
      </ItemContent>
    </BaseMenu.CheckboxItem>
  );
}

export type MenuRadioGroupProps = Omit<BaseMenu.RadioGroup.Props, 'children'> & {
  /** Group heading in the kit's menu-label style: "Language" */
  label?: ReactNode;
  children: ReactNode;
};

/** One choice out of several `MenuRadioItem`s */
export function MenuRadioGroup({ label, children, ...props }: MenuRadioGroupProps) {
  return (
    <BaseMenu.RadioGroup {...props}>
      {label != null && (
        <BaseMenu.GroupLabel className="cx-menu-label">{label}</BaseMenu.GroupLabel>
      )}
      {children}
    </BaseMenu.RadioGroup>
  );
}

export type MenuRadioItemProps = Omit<BaseMenu.RadioItem.Props, 'className' | 'children'> &
  ItemContentProps & {
    children: ReactNode;
    className?: string;
  };

/** One option of a `MenuRadioGroup`; the chosen one shows the sanguine dot */
export function MenuRadioItem({ icon, end, className, children, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem className={clsx('cx-menu-item', className)} {...props}>
      <ItemContent icon={icon} end={end}>
        {children}
      </ItemContent>
    </BaseMenu.RadioItem>
  );
}

export type MenuGroupProps = Omit<BaseMenu.Group.Props, 'children'> & {
  /** Group heading in the kit's menu-label style: "Sheet" */
  label?: ReactNode;
  children: ReactNode;
};

/** A labelled group of items */
export function MenuGroup({ label, children, ...props }: MenuGroupProps) {
  return (
    <BaseMenu.Group {...props}>
      {label != null && (
        <BaseMenu.GroupLabel className="cx-menu-label">{label}</BaseMenu.GroupLabel>
      )}
      {children}
    </BaseMenu.Group>
  );
}

/** A line between groups, edge to edge */
export function MenuSeparator() {
  return <BaseMenu.Separator className="cx-menu-sep" />;
}
