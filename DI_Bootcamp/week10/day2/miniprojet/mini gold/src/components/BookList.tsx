import React from 'react';
import { useBookActions } from '../hooks/useBookActions';
import { BookItemComponent } from './BookItem';

export const BookList = () => {
  const { items, filter, setFilter, searchQuery, setSearchQuery } = useBookActions();

  return (
    <div className="book-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'read' ? 'active' : ''} 
            onClick={() => setFilter('read')}
          >
            Read
          </button>
          <button 
            className={filter === 'unread' ? 'active' : ''} 
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
        </div>
      </div>

      <div className="book-list">
        {items.length === 0 ? (
          <p className="empty-state">No books found.</p>
        ) : (
          items.map((book) => <BookItemComponent key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
};