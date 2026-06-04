import { configureStore } from '@reduxjs/toolkit';
import ageReducer from './features/ageSlice';

export const store = configureStore({
  reducer: {
    age: ageReducer,
  },
});