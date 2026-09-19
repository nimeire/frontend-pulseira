import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
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
    const classes = classNames(styles.button, styles[variant], className);

    return <button ref={ref} type="button" className={classes} {...rest} />;
  },
);
