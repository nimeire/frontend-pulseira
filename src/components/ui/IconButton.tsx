import { forwardRef, type ButtonHTMLAttributes } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, ...rest }, ref) {
    const classes = [styles.iconButton, className].filter(Boolean).join(' ');

    return <button ref={ref} type="button" className={classes} {...rest} />;
  },
);
