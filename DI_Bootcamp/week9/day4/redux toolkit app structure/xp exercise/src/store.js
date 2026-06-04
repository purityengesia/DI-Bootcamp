import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // We will create this in the next step

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // Note: redux-thunk is included in the default middleware automatically.
});