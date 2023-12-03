import React from 'react';

interface RadioProps {
  id: string;
  label: string;
  value: string;
}

const RadioField = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ id, label, value }, ref) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="radio" id={id} value={value} ref={ref} />
    </div>
  )
);

export default RadioField;
