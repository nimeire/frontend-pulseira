import { Link, type LinkProps } from 'react-router-dom';
import { classNames } from '../../utils/classNames';
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
  const classes = classNames(
    buttonStyles.button,
    buttonStyles[variant],
    className,
  );

  return <Link className={classes} {...rest} />;
}
