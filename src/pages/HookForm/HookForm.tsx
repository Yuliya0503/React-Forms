import React, { useEffect, useRef } from 'react';
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
import FormField from '../../components/FormField/FormField';

const HookForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resolver = yupResolver(validationSchema) as Resolver<FormInput>;
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
      <Link className={styles.link} to="/">
        Home
      </Link>
      <h2 className={styles.title}>React Hook Form</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
      >
        <FormField label="Name" error={errors.name}>
          <input {...register('name')} />
        </FormField>

        <FormField label="Age" error={errors.age}>
          <input {...register('age')} type="number" />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <input {...register('email')} type="email" />
        </FormField>

        <FormField label="Confirm Email" error={errors.confirmEmail}>
          <input {...register('confirmEmail')} type="email" />
        </FormField>

        <FormField label="Password" error={errors.password}>
          <input
            {...register('password')}
            type="password"
            onChange={(e) => {
              const password = e.target.value;
              setValue('password', password);
            }}
          />
        </FormField>

        <FormField label="Confirm Password" error={errors.confirmPassword}>
          <input {...register('confirmPassword')} type="password" />
        </FormField>

        <FormField label="Gender" error={errors.gender}>
          <div className={styles.genders}>
            <div className={styles.gender}>
              <label className={styles.label} htmlFor="male">
                Male
              </label>
              <input {...register('gender')} type="radio" value="male" />
            </div>
            <div className={styles.gender}>
              <label className={styles.label} htmlFor="female">
                Female
              </label>
              <input {...register('gender')} type="radio" value="female" />
            </div>
          </div>
        </FormField>

        <FormField label="Accept Terms" error={errors.acceptTerms}>
          <label className={styles.checkbox}>
            <input
              {...register('acceptTerms')}
              type="checkbox"
              className={styles.checkbox_input}
            />
            Accept T&C
          </label>
        </FormField>

        <FormField label="Upload Image" error={errors.image}>
          <input type="file" id="image" ref={fileInputRef} />
        </FormField>

        <FormField label="Select Country" error={errors.countryId}>
          <select className={styles.select} {...register('countryId')}>
            <option value="" label="Select a country" />
            {countries.map((country, index) => (
              <option key={index} value={country} label={country} />
            ))}
          </select>
        </FormField>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
