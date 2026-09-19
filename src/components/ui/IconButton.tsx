import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, ...rest }, ref) {
    const classes = classNames(styles.iconButton, className);

    return <button ref={ref} type="button" className={classes} {...rest} />;
  },
);
