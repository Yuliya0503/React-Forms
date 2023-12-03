import React, { useEffect, useRef, useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setImageData } from '../../Store/formReduser';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../validation/validSchema';
import { setCountries } from '../../Store/countrieesReduser';
import COUNTRIES_LIST from '../../models/constants';
import { RootState } from '../../Store/store';

interface FormInput {
  name: string;
  age: number;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean | undefined;
  image: FileList | undefined;
  countryId: string;
}

const HookForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resolver = yupResolver(validationSchema) as Resolver<FormInput>;
  const [passwordStrength, setPasswordStrength] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({ resolver });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  useEffect(() => {
    dispatch(setCountries(COUNTRIES_LIST));
  }, [dispatch]);

  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    if (fileInputRef.current?.files?.[0]) {
      const file = new FileReader();
      file.readAsDataURL(fileInputRef.current.files[0]);
      file.onload = async (event) => {
        if (event.target) {
          const base64Image = event.target.result as string;
          dispatch(setImageData(base64Image));
        }
      };
    }
    dispatch(setFormData(data));
    navigate('/success');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <label htmlFor="name">Name:</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>

        <label htmlFor="age">Age:</label>
        <input {...register('age')} type="number" />
        <p>{errors.age?.message}</p>

        <label htmlFor="email">Email:</label>
        <input {...register('email')} type="email" />
        <p>{errors.email?.message}</p>

        <label htmlFor="confirmEmail">Confirm Email:</label>
        <input {...register('confirmEmail')} type="email" />
        <p>{errors.confirmEmail?.message}</p>

        <label htmlFor="password">Password:</label>
        <input
          {...register('password')}
          type="password"
          onChange={(e) => {
            const password = e.target.value;
            setPasswordStrength(password);
            setValue('password', password);
          }}
        />
        <p>{errors.password?.message}</p>
        <div>Password Strength: {passwordStrength}</div>

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

        <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" ref={fileInputRef} />
        <p>{errors.image?.message}</p>

        <label htmlFor="countryId">Select Country:</label>
        <select {...register('countryId')}>
          <option value="" label="Select a country" />
          {countries.map((country, index) => (
            <option key={index} value={country} label={country} />
          ))}
        </select>
        <p>{errors.countryId?.message}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
