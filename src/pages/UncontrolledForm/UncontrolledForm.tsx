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
import RadioField from '../../components/RadioField/RadioField';
import InputField from '../../components/InputField/InputField';

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
        <InputField
          id="name"
          label="Name"
          type="text"
          ref={formRefs.name}
          required
          validationError={validationErrors.name}
        />
        <InputField
          id="age"
          label="Age"
          type="number"
          ref={formRefs.age}
          required
          min="0"
          validationError={validationErrors.age}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          ref={formRefs.email}
          required
          validationError={validationErrors.email}
        />
        <InputField
          id="confirmEmail"
          label="Confirm Email"
          type="email"
          ref={formRefs.confirmEmail}
          required
          validationError={validationErrors.confirmEmail}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          ref={formRefs.password}
          required
          validationError={validationErrors.password}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          ref={formRefs.confirmPassword}
          required
          validationError={validationErrors.confirmPassword}
        />

        <label className={styles.label}>Gender:</label>
        <div className={styles.genders}>
          <RadioField
            id="male"
            label="Male"
            value="male"
            ref={formRefs.gender}
          />
          <RadioField
            id="female"
            label="Female"
            value="female"
            ref={formRefs.gender}
          />
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
