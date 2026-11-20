import { Icon, type IconProps } from './Icon';

/** Chevron. The kit draws it with stroke 2 (DESIGN.md §1.8): pass `strokeWidth={2}`. */
export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}
