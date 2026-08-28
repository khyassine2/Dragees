import Link from 'next/link';

/**
 * `inverse` and `inverse-outline` are the variants for dark photography or
 * the plum sections; they exist so callers never override the palette through
 * `className`, where equal-specificity classes would fight unpredictably.
 */
type Variant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'inverse'
  | 'inverse-outline';

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  full?: boolean;
};

const VARIANT_CLASS: Record<Variant, string> = {
  solid: 'border border-plum bg-plum text-ivory before:bg-rose hover:text-ivory',
  outline: 'border border-plum text-plum before:bg-plum hover:text-ivory',
  ghost: 'border border-line text-plum before:bg-ivory-dim hover:text-plum',
  'inverse': 'border border-ivory bg-ivory text-plum before:bg-rose hover:text-ivory',
  'inverse-outline':
    'border border-ivory/60 text-ivory before:bg-ivory hover:text-plum',
};

const BASE_CLASS = [
  // `isolate` keeps the -z-10 wipe inside the button instead of letting it
  // fall behind an ancestor's own background layer.
  'group relative isolate inline-flex items-center justify-center overflow-hidden',
  'px-6 py-3.5 text-center label-micro font-medium transition-colors duration-500',
  'sm:px-8 sm:py-4',
  // The pseudo-element wipes upward on hover instead of animating a colour.
  'before:absolute before:inset-0 before:-z-10 before:origin-bottom',
  'before:scale-y-0 before:transition-transform before:duration-500',
  'before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-y-100',
].join(' ');

const composeClass = (props: ButtonBaseProps) =>
  [
    BASE_CLASS,
    VARIANT_CLASS[props.variant ?? 'solid'],
    props.full ? 'w-full' : '',
    props.className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

type ButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const { children, variant, className, full, ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className={composeClass({ children, variant, className, full })}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  onClick?: () => void;
};

export const ButtonLink = (props: ButtonLinkProps) => (
  <Link
    href={props.href}
    onClick={props.onClick}
    className={composeClass(props)}
  >
    <span className="relative z-10">{props.children}</span>
  </Link>
);
