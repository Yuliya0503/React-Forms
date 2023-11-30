import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .min(0, 'Age should be a positive number'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
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
  gender: yup.string().required('Select a gender'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms'),
  // Add validation rules for image and country
});
