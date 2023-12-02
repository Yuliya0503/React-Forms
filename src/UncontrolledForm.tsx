import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData, setImageData } from './Store/formReduser';
import { useNavigate, Link } from 'react-router-dom';
import { validationSchema } from './validation/validSchema';
import * as yup from 'yup';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const [passwordStrength, setPasswordStrength] = useState('');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const checkPasswordStrength = (password: string) => {
    console.log(password);
    return password;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      countryId: countryRef.current?.value || '', 
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (pictureRef.current?.files?.[0]) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(pictureRef.current.files[0]);
    
        fileReader.onload = (event) => {
          if (event.target) {
            const base64Image = event.target.result as string;
            dispatch(setImageData(base64Image));
          }
        };
      }
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
    <div>
      <Link to="/">Home</Link>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} required />
        <p>{validationErrors.name}</p>

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} required min="0" />
        <p>{validationErrors.age}</p>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} required />
        <p>{validationErrors.email}</p>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          required
          onChange={(e) => {
            const password = e.target.value;
            setPasswordStrength(checkPasswordStrength(password));
          }}
        />
        <p>{validationErrors.password}</p>
        <div>Password Strebgth: {passwordStrength}</div>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          required
        />
        <p>{validationErrors.confirmPassword}</p>

        <label>Gender:</label>
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          ref={genderRef}
        />
        <label htmlFor="female">Female</label>
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          ref={genderRef}
        />
        <p>{validationErrors.gender}</p>

        <label>
          <input type="checkbox" ref={acceptTermsRef} />
          Accept T&C
        </label>
        <p>{validationErrors.acceptTerms}</p>

        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          ref={pictureRef}
        />

        <label htmlFor="country">Select Country:</label>
        <select id="country" ref={countryRef}>
        <option value="" label="Select a country" />
        <option value="1" label="Country 1" />
        <option value="2" label="Country 2" />
      </select>
      <p>{validationErrors.countryId}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
