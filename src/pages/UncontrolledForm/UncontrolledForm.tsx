import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setImageData } from '../../Store/formReduser';
import { useNavigate, Link } from 'react-router-dom';
import { validationSchema } from '../../validation/validSchema';
import * as yup from 'yup';
import COUNTRIES_LIST from '../../models/countries';
import { setCountries } from '../../Store/countrieesReduser';
import { RootState } from '../../Store/store';
import styles from './UncontrolledForm.module.css';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const formRefs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLInputElement>(null),
    acceptTerms: useRef<HTMLInputElement>(null),
    picture: useRef<HTMLInputElement>(null),
    country: useRef<HTMLSelectElement>(null),
    confirmEmail: useRef<HTMLInputElement>(null),
  };

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    dispatch(setCountries(COUNTRIES_LIST));
  }, [dispatch]);

  const handleFileChange = () => {
    if (formRefs.picture.current?.files?.[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(formRefs.picture.current.files[0]);

      fileReader.onload = (event) => {
        if (event.target) {
          const base64Image = event.target.result as string;
          dispatch(setImageData(base64Image));
        }
      };
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name: formRefs.name.current?.value || '',
      age: parseInt(formRefs.age.current?.value || '0', 10),
      email: formRefs.email.current?.value || '',
      password: formRefs.password.current?.value || '',
      confirmPassword: formRefs.confirmPassword.current?.value || '',
      gender: formRefs.gender.current?.value || '',
      acceptTerms: formRefs.acceptTerms.current?.checked || false,
      countryId: formRefs.country.current?.value || '',
      confirmEmail: formRefs.confirmEmail.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      handleFileChange();
      dispatch(setFormData(formData));
      navigate('/success');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        if (error.inner) {
          const errors: Record<string, string> = {};
          error.inner.forEach((err) => {
            errors[String(err.path)] = err.message;
          });
          setValidationErrors(errors);
        }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} to="/">
        Home
      </Link>
      <h2 className={styles.title}>Uncontrolled Form</h2>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="on">
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input type="text" id="name" ref={formRefs.name} required />
        <p>{validationErrors.name}</p>

        <label className={styles.label} htmlFor="age">
          Age:
        </label>
        <input type="number" id="age" ref={formRefs.age} required min="0" />
        <p>{validationErrors.age}</p>

        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input type="email" id="email" ref={formRefs.email} required />
        <p>{validationErrors.email}</p>

        <label className={styles.label} htmlFor="confirmEmail">
          Confirm Email:
        </label>
        <input type="email" id="confirmEmail" ref={formRefs.confirmEmail} required />
        <p>{validationErrors.confirmEmail}</p>

        <label className={styles.label} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          ref={formRefs.password}
          required
        />
        <p>{validationErrors.password}</p>

        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          ref={formRefs.confirmPassword}
          required
        />
        <p>{validationErrors.confirmPassword}</p>

        <label className={styles.label}>Gender:</label>
        <div className={styles.genders}>
          <div className={styles.gender}>
            <label className={styles.label} htmlFor="male">
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              ref={formRefs.gender}
            />
          </div>
          <div className={styles.gender}>
            <label className={styles.label} htmlFor="female">
              Female
            </label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              ref={formRefs.gender}
            />
          </div>
        </div>
        <p>{validationErrors.gender}</p>

        <label className={styles.checkbox}>
          <input
            className={styles.checkbox_input}
            type="checkbox"
            ref={formRefs.acceptTerms}
          />
          Accept T&C
        </label>
        <p>{validationErrors.acceptTerms}</p>

        <label className={styles.label} htmlFor="picture">
          Upload Picture:
        </label>
        <input type="file" id="picture" ref={formRefs.picture} />

        <label className={styles.label} htmlFor="country">
          Select Country:
        </label>
        <select className={styles.select} id="country" ref={formRefs.country}>
          <option value="" label="Select a country" />
          {countries.map((country, index) => (
            <option key={index} value={country} label={country} />
          ))}
        </select>
        <p>{validationErrors.countryId}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
