import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormData } from '../../Store/formReduser';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../validation/validSchema';

interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms?: boolean | undefined;
  confirmEmail: string;  
  countryId: string;
}

const HookForm: React.FC = () => {
  const resolver = yupResolver(validationSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ resolver });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    dispatch(setFormData(data));
    navigate('/success');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>

        <label htmlFor="age">Age:</label>
        <input {...register('age')} type="number" />
        <p>{errors.age?.message}</p>

        <label htmlFor="email">Email:</label>
        <input {...register('email')} type="email" />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Password:</label>
        <input {...register('password')} type="password" />
        <p>{errors.password?.message}</p>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input {...register('confirmPassword')} type="password" />
        <p>{errors.confirmPassword?.message}</p>

        <label>Gender:</label>
        <label htmlFor="male">Male</label>
        <input {...register('gender')} type="radio" value="male" />
        <label htmlFor="female">Female</label>
        <input {...register('gender')} type="radio" value="female" />
        <p>{errors.gender?.message}</p>

        <label>
          <input {...register('acceptTerms')} type="checkbox" />
          Accept T&C
        </label>
        <p>{errors.acceptTerms?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
