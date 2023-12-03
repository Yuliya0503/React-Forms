import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../Store/store';
import ImageDisplay from '../../components/ImageDispaly/ImageDispaly';

const Main: React.FC = () => {
  const base64Image = useSelector(
    (state: RootState) => state.form.formData.picture
  );

  return (
    <div>
      <h2>Main Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/hook-form">React Hook Form</Link>
          </li>
        </ul>
      </nav>
      {base64Image && <ImageDisplay />}
    </div>
  );
};

export default Main;
