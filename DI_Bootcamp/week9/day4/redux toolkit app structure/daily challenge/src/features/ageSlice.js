import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  age: 20,
  loading: false,
};

export const ageUpAsync = createAsyncThunk('age/ageUpAsync', async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return 1;
});

export const ageDownAsync = createAsyncThunk('age/ageDownAsync', async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return 1;
});

const ageSlice = createSlice({
  name: 'age',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age += action.payload;
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age -= action.payload;
      });
  },
});

export default ageSlice.reducer;