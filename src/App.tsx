import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import UncontrolledForm from './UncontrolledForm';
import HookForm from './HookForm';
import Main from './MainPage';
import SuccessRedirect from './SuccessRedirect';

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/hook-form" element={<HookForm />} />
        <Route path="/success" element={<SuccessRedirect />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
