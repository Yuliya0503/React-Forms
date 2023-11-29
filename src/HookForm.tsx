import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormData } from './Store/formReduser';
import { Link, useNavigate } from 'react-router-dom';

interface FormInput {
  textInput: string;
}

const HookForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormInput) => {
    dispatch(setFormData(data));
    alert(`Submitted value: ${data.textInput}`);
    // Логика для редиректа на страницу success
    navigate('/success');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Enter Text:
          <input {...register('textInput')} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
