import * as yup from 'yup';
import { FileObject } from '../models/interface'

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^([A-Z][a-z]*)(-[A-Z][a-z]*)*([ ][A-Z][a-z]*)*$/,
      'Name should consist of one or more words, each starting with an uppercase letter'
    ),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age should be a positive number')
    .integer('Age should be an integer'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  confirmEmail: yup
    .string()
    .required('Email confirmation is required')
    .oneOf([yup.ref('email')], 'Emails must match'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z0-9\S]{8,}$/,
      'Password must contain at least 8 characters, 1 digit, 1 uppercase letter, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup
    .string()
    .required('Select a gender')
    .oneOf(['male', 'female', 'other'], 'Invalid gender'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms'),
  image: yup
  .mixed()
  .test(
    'fileSize',
    'File size is too large',
    (value) => {
      const file: FileObject | undefined = value as FileObject | undefined;
      if (!file) return true;

      const fileSize = file.size;
      const fileType = file.type;

      const isSizeValid = fileSize <= 1024 * 1024; // 1 MB
      const isTypeValid = ['image/png', 'image/jpeg'].includes(fileType);

      return isSizeValid && isTypeValid;
    }
  ),
  countryId: yup
    .string()
    .required('Select a country')
});
