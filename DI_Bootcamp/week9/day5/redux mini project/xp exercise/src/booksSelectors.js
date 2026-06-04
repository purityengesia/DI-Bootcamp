// booksSelectors.js
import { createSelector } from '@reduxjs/toolkit';

// 1. Base selector: retrieves the raw books array from the state
const selectBooksState = (state) => state.books;

// 2. General selector to get all books
export const selectBooks = createSelector(
  [selectBooksState],
  (books) => books
);

// 3. Genre-specific selectors
// These use selectBooks as an input, creating a memoization chain.

export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Horror')
);

export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Fantasy')
);

export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === 'Science Fiction')
);