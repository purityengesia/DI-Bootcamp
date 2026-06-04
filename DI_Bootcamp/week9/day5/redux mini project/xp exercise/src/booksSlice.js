// booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
  { id: 2, title: 'It', author: 'Stephen King', genre: 'Horror' },
  { id: 3, title: 'Dracula', author: 'Bram Stoker', genre: 'Horror' },
  { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
  { id: 5, title: 'Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy' },
  { id: 6, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
  { id: 7, title: 'Neuromancer', author: 'William Gibson', genre: 'Science Fiction' },
  { id: 8, title: 'Foundation', author: 'Isaac Asimov', genre: 'Science Fiction' },
];

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // No actions required for this specific exercise, 
    // but we keep the structure for extensibility.
  },
});

export default booksSlice.reducer;