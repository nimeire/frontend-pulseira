import {
  forwardRef,
  useContext,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { classNames } from '../../utils/classNames';
import type { IconComponent } from '../icons';
import { VarianteCampoContext } from './variante-campo';
import styles from './FormField.module.css';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: IconComponent;
  endAdornment?: ReactNode;
  /** Mensagem exibida abaixo do campo. */
  error?: string | null;
  /** Marca o campo como inválido (borda/aria) mesmo sem exibir mensagem. */
  invalid?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    { id, label, icon: Icon, endAdornment, error, invalid, className, ...rest },
    ref,
  ) {
    const linha = useContext(VarianteCampoContext) === 'linha';
    const errorId = `${id}-erro`;
    const hasError = Boolean(error || invalid);

    return (
      <div className={classNames(styles.field, linha && styles.linha, className)}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={styles.inputWrapper}>
          {!linha && <Icon className={styles.icon} />}
          <input
            ref={ref}
            id={id}
            className={classNames(
              styles.input,
              endAdornment ? styles.hasEndAdornment : false,
            )}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...rest}
          />
          {endAdornment && (
            <div className={styles.endAdornment}>{endAdornment}</div>
          )}
        </div>
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
