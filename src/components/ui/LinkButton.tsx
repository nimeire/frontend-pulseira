import { Link, type LinkProps } from 'react-router-dom';
import buttonStyles from './Button.module.css';
import type { ButtonVariant } from './Button';

interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
}

export function LinkButton({
  variant = 'primary',
  className,
  ...rest
}: LinkButtonProps) {
  const classes = [buttonStyles.button, buttonStyles[variant], className]
    .filter(Boolean)
    .join(' ');

  return <Link className={classes} {...rest} />;
}
