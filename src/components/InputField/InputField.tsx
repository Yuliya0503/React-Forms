import React from 'react';
import styles from '../../pages/UncontrolledForm/UncontrolledForm.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  required: boolean;
  validationError?: string;
}

const InputField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ id, label, required, validationError, ...rest }, ref) => (
  <>
    <label className={styles.label} htmlFor={id}>
      {label}:
    </label>
    <input type="text" id={id} ref={ref} required={required} {...rest} />
    <p>{validationError}</p>
  </>
);

export default React.forwardRef(InputField);
