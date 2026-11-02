import { useContext } from 'react';
import { classNames } from '../../utils/classNames';
import { VarianteCampoContext } from '../form-field/variante-campo';
import type { OpcaoChecklist } from '../../data/opcoesMedicas';
import styles from './ChecklistField.module.css';

interface ChecklistFieldProps {
  legend: string;
  name: string;
  options: OpcaoChecklist[];
  value: string[];
  onChange: (value: string[]) => void;
  /** false renders radio semantics (single pick) instead of checkboxes. Defaults to true. */
  multiple?: boolean;
  hint?: string;
}

export function ChecklistField({
  legend,
  name,
  options,
  value,
  onChange,
  multiple = true,
  hint,
}: ChecklistFieldProps) {
  const linha = useContext(VarianteCampoContext) === 'linha';

  function handleToggle(optionValue: string) {
    if (!multiple) {
      onChange([optionValue]);
      return;
    }

    const isSelected = value.includes(optionValue);
    onChange(
      isSelected
        ? value.filter((selected) => selected !== optionValue)
        : [...value, optionValue],
    );
  }

  return (
    <fieldset className={classNames(styles.fieldset, linha && styles.linha)}>
      <legend className={styles.legend}>{legend}</legend>
      {hint && <p className={styles.hint}>{hint}</p>}

      <div className={styles.options}>
        {options.map((option) => {
          const checked = value.includes(option.value);
          return (
            <label
              key={option.value}
              className={classNames(styles.option, checked && styles.checked)}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                checked={checked}
                onChange={() => handleToggle(option.value)}
                className={styles.input}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
