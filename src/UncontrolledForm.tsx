import React, { useRef } from 'react';

const UncontrolledForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      alert(`Submitted value: ${inputRef.current.value}`);
    }
  };

  return (
    <div>
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