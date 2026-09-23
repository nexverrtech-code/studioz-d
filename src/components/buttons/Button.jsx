import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const VARIANTS = {
  solid: 'btn-solid',
  outline: 'btn-outline',
  light: 'btn-light',
  ghostLight: 'btn-ghost-light',
  accent: 'btn-accent',
};

const SIZES = {
  sm: 'min-h-[42px] px-4 py-2.5 text-[0.68rem]',
  md: '',
  lg: 'min-h-[54px] px-7 py-4',
};

/**
 * The one button in the system.
 *
 * Renders as `<Link>`, `<a>` or `<button>` depending on what it is given, so
 * navigation is always a real link (middle-clickable, focusable, crawlable)
 * and actions are always a real button.
 *
 * `fullWidth` is handled with `w-full` rather than a fixed width, which is
 * what keeps buttons inside their parent at 320px.
 */
export const Button = forwardRef(function Button(
  {
    children,
    to,
    href,
    type = 'button',
    variant = 'solid',
    size = 'md',
    fullWidth = false,
    icon: Icon,
    iconPosition = 'right',
    className,
    external = false,
    disabled = false,
    ...rest
  },
  ref
) {
  const classes = cn(
    'btn',
    VARIANTS[variant] ?? VARIANTS.solid,
    SIZES[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.6} />
      )}
      <span className="min-w-0">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.6} />
      )}
    </>
  );

  if (to && !disabled) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
});

export default Button;
