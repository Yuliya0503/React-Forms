import { FieldError } from 'react-hook-form';
import styles from '../../pages/UncontrolledForm/UncontrolledForm.module.css';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => (
  <div className={styles.formField}>
    <label className={styles.label} htmlFor={label.toLowerCase()}>
      {label}:
    </label>
    {children}
    <p className={styles.error}>{error?.message}</p>
  </div>
);

export default FormField;
