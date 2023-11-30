import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormData } from './Store/formReduser';
import { Link, useNavigate } from 'react-router-dom';

interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  //+picture + country
}

const HookForm: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormInput>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = watch('password', '');
  //const confirmPassword = watch('confirmPassword', '');

  const onSubmit = (data: FormInput) => {
    dispatch(setFormData(data));
    navigate('/success');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input
          {...register('name', { required: true, pattern: /^[A-Z][a-zA-Z]*$/ })}
        />

        <label htmlFor="age">Age:</label>
        <input {...register('age', { required: true, min: 0 })} type="number" />

        <label htmlFor="email">Email:</label>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          type="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          {...register('password', {
            required: true,
            // validate: (value) => {
            // },
          })}
          type="password"
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          {...register('confirmPassword', {
            required: true,
            validate: (value) => value === password || 'Passwords should match',
          })}
          type="password"
        />

        <label>Gender:</label>
        <label htmlFor="male">Male</label>
        <input {...register('gender')} type="radio" value="male" />
        <label htmlFor="female">Female</label>
        <input {...register('gender')} type="radio" value="female" />

        <label>
          <input {...register('acceptTerms')} type="checkbox" />
          Accept T&C
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
