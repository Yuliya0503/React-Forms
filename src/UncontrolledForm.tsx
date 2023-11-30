import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from './Store/formReduser';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
/**name
 * age
 * email
 * 2 password (1 number, 1 WORD, 1word, 1 special cymbol)
 * gender (use radio buttons or select control)
 *  accept T&C (checkbox)
 * input control to upload picture (validate size and extension, allow png jpeg, save in redux store as base64)
 * autocomplete control to select country (all countries shoudl be stored in the Redux store)
 * Form should contain labels, which should be connected with inouts (look at htmlFor)
 */

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
  const countryRef = useRef<HTMLInputElement>(null);

  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (password: string) => {
    console.log(password);
    return password;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
    };
    dispatch(setFormData(formData));
    navigate('/success');
  };
  //{/* pattern='[A-Z][a-zA-Z]' */ }

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} required />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} required min="0" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} required />

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
        <div>Password Strebgth: {passwordStrength}</div>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          required
        />

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

        <label>
          <input type="checkbox" ref={acceptTermsRef} />
          Accept T&C
        </label>

        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          ref={pictureRef}
          accept=".png, .jpeg, .jpg"
        />

        <label htmlFor="country">Select Country:</label>
        <input type="text" id="country" ref={countryRef} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
