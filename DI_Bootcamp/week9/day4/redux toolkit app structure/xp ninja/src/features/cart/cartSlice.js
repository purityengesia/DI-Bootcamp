import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { ...product, quantity }
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;