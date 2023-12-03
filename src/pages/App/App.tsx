import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../Store/store';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import HookForm from '../HookForm/HookForm';
import Main from '../Main/MainPage';
import SuccessRedirect from '../../components/SuccessRedirect';
import NotFound from '../NotFound/NotFound';

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/hook-form" element={<HookForm />} />
        <Route path="/success" element={<SuccessRedirect />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
