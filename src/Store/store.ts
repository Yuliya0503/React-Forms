import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReduser from './formReduser';
import countriesReduser from './countrieesReduser';

const rootReducer = combineReducers({
  form: formReduser,
  countries: countriesReduser,
});

export type RootState = ReturnType<typeof rootReducer>;

const storeSetup = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = storeSetup();

export type AppStore = ReturnType<typeof storeSetup>;
export type AppDispatch = AppStore['dispatch'];
