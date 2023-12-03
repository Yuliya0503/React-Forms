import React, { useEffect, useRef, useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setImageData } from '../../Store/formReduser';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../validation/validSchema';
import { setCountries } from '../../Store/countrieesReduser';
import COUNTRIES_LIST from '../../models/countries';
import { RootState } from '../../Store/store';
import { FormInput } from '../../models/interface';
import styles from '../UncontrolledForm/UncontrolledForm.module.css';

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
    <div className={styles.wrapper}>
      <Link className={styles.link} to="/">Home</Link>
      <h2 className={styles.title}>React Hook Form</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <label className={styles.label} htmlFor="name">Name:</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>

        <label className={styles.label} htmlFor="age">Age:</label>
        <input {...register('age')} type="number" />
        <p>{errors.age?.message}</p>

        <label className={styles.label} htmlFor="email">Email:</label>
        <input {...register('email')} type="email" />
        <p>{errors.email?.message}</p>

        <label className={styles.label} htmlFor="confirmEmail">Confirm Email:</label>
        <input {...register('confirmEmail')} type="email" />
        <p>{errors.confirmEmail?.message}</p>

        <label className={styles.label} htmlFor="password">Password:</label>
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

        <label className={styles.label} htmlFor="confirmPassword">Confirm Password:</label>
        <input {...register('confirmPassword')} type="password" />
        <p>{errors.confirmPassword?.message}</p>

        <label className={styles.label}>Gender:</label>
          <div className={styles.genders}>
            <div className={styles.gender}>
              <label className={styles.label} htmlFor="male">Male</label>
              <input {...register('gender')} type="radio" value="male" />
            </div>
            <div className={styles.gender}>
              <label className={styles.label} htmlFor="female">Female</label>
              <input {...register('gender')} type="radio" value="female" />
            </div>
          </div>
        <p>{errors.gender?.message}</p>

        <label className={styles.checkbox}>
          <input {...register('acceptTerms')} type="checkbox" className={styles.checkbox_input} />
          Accept T&C
        </label>
        <p>{errors.acceptTerms?.message}</p>

        <label className={styles.label} htmlFor="image">Upload Image:</label>
        <input type="file" id="image" ref={fileInputRef} />
        <p>{errors.image?.message}</p>

        <label className={styles.label} htmlFor="countryId">Select Country:</label>
        <select className={styles.select} {...register('countryId')}>
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
