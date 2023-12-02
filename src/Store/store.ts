import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReduser from './formReduser';

const rootReducer = combineReducers({
  form: formReduser,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

export default store;
