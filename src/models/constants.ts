import { FormState } from './interface';

export const initialState: FormState = {
  formData: {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false,
    picture: '',
  },
};
