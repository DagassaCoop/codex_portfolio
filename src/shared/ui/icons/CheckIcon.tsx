import { Icon, type IconProps } from './Icon';

/** Check mark. The kit draws it with stroke 2 (DESIGN.md §1.8): pass `strokeWidth={2}`. */
export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}
