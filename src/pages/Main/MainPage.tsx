import React from 'react';
import { Link } from 'react-router-dom';

const Main: React.FC = () => (
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
  </div>
);

export default Main;
