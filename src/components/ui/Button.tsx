import { forwardRef, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'onPrimary'
  | 'onPrimaryGhost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', className, ...rest }, ref) {
    const classes = [styles.button, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    return <button ref={ref} type="button" className={classes} {...rest} />;
  },
);
