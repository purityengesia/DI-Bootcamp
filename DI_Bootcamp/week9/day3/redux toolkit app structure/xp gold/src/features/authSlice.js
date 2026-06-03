import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null, // Will store user details like name, email, etc.
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action: Set authentication status to true
    loginUser: (state) => {
      state.isAuthenticated = true;
    },
    // Action: Reset authentication status and clear user
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    // Action: Store user information
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export actions
export const { loginUser, logoutUser, setUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;