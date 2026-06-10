import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { useBookActions } from './hooks/useBookActions';
import './index.css';

// Inner component to use hooks
const AppContent = () => {
  const { allItems, setBooks } = useBookActions();

  // Challenge 4: Data Persistence
  useEffect(() => {
    const savedBooks = localStorage.getItem('myLibraryBooks');
    if (savedBooks) {
      try {
        setBooks(JSON.parse(savedBooks));
      } catch (e) {
        console.error("Failed to parse saved books");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myLibraryBooks', JSON.stringify(allItems));
  }, [allItems]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Personal Library</h1>
        <p>Manage your reading journey</p>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <BookForm />
        </section>
        
        <section className="list-section">
          <BookList />
        </section>
      </main>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;