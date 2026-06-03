import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    // We only need 'auth' for this exercise
    auth: authReducer,
  },
});