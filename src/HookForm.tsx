import React from 'react';
import { useForm } from 'react-hook-form';

interface FormInput {
  textInput: string;
}

const HookForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    alert(`Submitted value: ${data.textInput}`);
  };

  return (
    <div>
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