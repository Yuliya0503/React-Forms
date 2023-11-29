import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from './Store/formReduser';
import { useNavigate, Link } from 'react-router-dom';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { textInput: inputRef.current?.value || '' };
    dispatch(setFormData(formData));
    // логика для редиректа на страницу success
    navigate('/success');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Text:
          <input type="text" ref={inputRef} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
