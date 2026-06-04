import { loginSuccess, logout } from './authSlice';

// Simulating an API call for Login
export const loginUser = (username) => async (dispatch) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Simulate successful login
  dispatch(loginSuccess({ username }));
};

// Simple logout action wrapper
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};