import React, { useState } from 'react';

function BookForm() {
  // State to hold the book data
  const [book, setBook] = useState({
    title: "",
    author: ""
  });
  
  // State to track if form was submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Display data in console
    console.log(book);
    
    // 2. Update state to show success message
    setIsSubmitted(true);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <h3>Exercise 1: Book Form</h3>
      
      {/* Ternary operator to switch between Form and Success Message */}
      {isSubmitted ? (
        <div style={{ color: 'green' }}>
          <h2>Success!</h2>
          <p>You have successfully added the book.</p>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Book Title: </label>
            <input 
              type="text" 
              name="title" 
              value={book.title} 
              onChange={handleChange} 
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Author: </label>
            <input 
              type="text" 
              name="author" 
              value={book.author} 
              onChange={handleChange} 
              required
            />
          </div>
          <button type="submit">Add Book</button>
        </form>
      )}
    </div>
  );
}

export default BookForm;