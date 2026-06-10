import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../model/Book';

interface BooksState {
  items: Book[];
  filter: 'all' | 'read' | 'unread';
  searchQuery: string;
}

const initialState: BooksState = {
  items: [],
  filter: 'all',
  searchQuery: '',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.items.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((book) => book.id !== action.payload);
    },
    toggleReadStatus: (state, action: PayloadAction<string>) => {
      const book = state.items.find((b) => b.id === action.payload);
      if (book) {
        book.isRead = !book.isRead;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'read' | 'unread'>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.items = action.payload;
    },
  },
});

export const { 
  addBook, 
  removeBook, 
  toggleReadStatus, 
  setFilter, 
  setSearchQuery,
  setBooks 
} = booksSlice.actions;

export default booksSlice.reducer;