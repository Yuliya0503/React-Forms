import { configureStore } from '@reduxjs/toolkit';
import formReduser from './formReduser';

const store = configureStore({
  reducer: {
    form: formReduser,
  },
});

export default store;
