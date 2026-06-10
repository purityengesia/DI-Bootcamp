import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { 
  addBook, 
  removeBook, 
  toggleReadStatus, 
  setFilter, 
  setSearchQuery,
  setBooks 
} from '../store/booksSlice';
import { Book } from '../model/Book';

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T): T => {
  return useSelector(selector);
};

// Custom hook for book operations
export const useBookActions = () => {
  const dispatch = useAppDispatch();
  
  const items = useAppSelector((state) => state.books.items);
  const filter = useAppSelector((state) => state.books.filter);
  const searchQuery = useAppSelector((state) => state.books.searchQuery);

  // Derived state (filtering logic)
  const filteredBooks = items.filter((book) => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'read' && book.isRead) ||
      (filter === 'unread' && !book.isRead);
    
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return {
    items: filteredBooks,
    allItems: items, // Needed for stats or full list
    filter,
    searchQuery,
    addBook: (book: Book) => dispatch(addBook(book)),
    removeBook: (id: string) => dispatch(removeBook(id)),
    toggleReadStatus: (id: string) => dispatch(toggleReadStatus(id)),
    setFilter: (newFilter: 'all' | 'read' | 'unread') => dispatch(setFilter(newFilter)),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    setBooks: (books: Book[]) => dispatch(setBooks(books)),
  };
};