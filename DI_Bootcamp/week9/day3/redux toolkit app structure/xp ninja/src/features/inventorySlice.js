import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // Optional: Pre-populate with some data
  { id: 1, name: 'Apple', quantity: 10 },
  { id: 2, name: 'Banana', quantity: 5 },
];

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = {
        id: Date.now(),
        name: action.payload.name,
        quantity: parseInt(action.payload.quantity) || 0,
      };
      state.push(product);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.find((item) => item.id === id);
      if (product) {
        product.quantity = parseInt(quantity);
      }
    },
    removeProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions;
export default inventorySlice.reducer;