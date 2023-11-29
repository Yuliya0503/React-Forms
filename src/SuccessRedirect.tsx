import { Navigate } from 'react-router-dom';
import React from 'react';

const SuccessRedirect: React.FC = () => {
  return <Navigate to="/" />;
};

export default SuccessRedirect;
