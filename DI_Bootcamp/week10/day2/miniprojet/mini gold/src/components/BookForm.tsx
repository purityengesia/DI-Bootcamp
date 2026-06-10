import React, { useState } from 'react';
import { BookItem } from '../model/Book';
import { useBookActions } from '../hooks/useBookActions';

export const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Fiction');
  const { addBook } = useBookActions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;

    const newBook = new BookItem(title, author, category);
    addBook(newBook); // Dispatches to Redux

    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>Add New Book</h3>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Technical">Technical</option>
      </select>
      <button type="submit">Add to Library</button>
    </form>
  );
};