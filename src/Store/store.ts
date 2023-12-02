import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReduser from './formReduser';

const rootReducer = combineReducers({
  form: formReduser,
});

export type RootState = ReturnType<typeof rootReducer>;

const storeSetup = () => {
  return configureStore({
    reducer: {
      reducer: rootReducer,
    },
  });
};

export const store = storeSetup();

export type AppStore = ReturnType<typeof storeSetup>;
export type AppDispatch = AppStore['dispatch'];
