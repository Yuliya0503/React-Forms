import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UncontrolledForm from './UncontrolledForm';
import HookForm from './HookForm';
import Main from './MainPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/hook-form" element={<HookForm />} />
    </Routes>
  </Router>
);

export default App;
