// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import productivityReducer from './productivitySlice';

export const store = configureStore({
  reducer: {
    productivity: productivityReducer,
  },
});