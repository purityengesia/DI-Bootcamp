// src/cartSelectors.js
import { createSelector } from '@reduxjs/toolkit';

// Input selectors
const selectCartState = (state) => state.cart;

// Memoized selectors
export const selectProducts = createSelector(
  [selectCartState],
  (cartState) => cartState.products
);

export const selectCartItems = createSelector(
  [selectCartState],
  (cartState) => cartState.cart
);

export const calculateTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
);