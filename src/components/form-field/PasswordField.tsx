import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon } from '../icons';
import { FormField } from './FormField';
import styles from './PasswordField.module.css';

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  id?: string;
  label: string;
  error?: string | null;
  invalid?: boolean;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ label, id, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const [isVisible, setIsVisible] = useState(false);

    return (
      <FormField
        ref={ref}
        id={fieldId}
        label={label}
        icon={LockIcon}
        type={isVisible ? 'text' : 'password'}
        endAdornment={
          <button
            type="button"
            className={styles.toggle}
            aria-label={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={isVisible}
            onClick={() => setIsVisible((visible) => !visible)}
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        {...rest}
      />
    );
  },
);
