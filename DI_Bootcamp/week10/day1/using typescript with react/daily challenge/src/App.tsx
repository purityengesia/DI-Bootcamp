import React, { useState } from 'react';

// ==============================================================================
// 1. Define Types
// ==============================================================================

// Define the structure for a Book item
interface Book {
  id: number;
  title: string;
  author: string;
}

// ==============================================================================
// 2. Generic List Component
// ==============================================================================

// We define the interface as generic: ListProps
// This tells TypeScript that this interface expects a type 'T'.
interface ListProps {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// The component itself is also generic: <T,>
// It accepts the items and the renderItem function.
const List = <T,>({ items, renderItem }: ListProps) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, index) => (
        // We use index as key here since T is generic and might not have an 'id'
        <li key={index} style={listItemStyle}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

// ==============================================================================
// 3. Main BookApp Component
// ==============================================================================

const BookApp = () => {
  // State for the list of books
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" }
  ]);

  // State for the form inputs
  const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');

  // Function to add a new book
  const addBook = () => {
    if (!titleInput || !authorInput) return;

    const newBook: Book = {
      id: Date.now(), // Generate a simple unique ID
      title: titleInput,
      author: authorInput,
    };

    // Update state by creating a new array with the new book appended
    setBooks((prevBooks) => [...prevBooks, newBook]);

    // Reset form inputs
    setTitleInput('');
    setAuthorInput('');
  };

  return (
    <div style={containerStyle}>
      <h1>📚 Book List Manager</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        A generic list component implementation using TypeScript Generics.
      </p>

      {/* Form Section */}
      <div style={cardStyle}>
        <h3>Add New Book</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Book Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Author"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button onClick={addBook} style={buttonStyle}>Add to List</button>
      </div>

      {/* List Display Section */}
      <div style={cardStyle}>
        <h3>My Reading List ({books.length})</h3>
        
        {/* 
           Using the Generic <List> component.
           We specify the type  so TypeScript knows 'item' inside renderItem is a Book.
           We pass the 'books' array and a function defining the UI for each book.
        */}
        <List<Book>
          items={books}
          renderItem={(book) => (
            <div>
              <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{book.title}</span>
              <span style={{ color: '#64748b', marginLeft: '10px' }}>by {book.author}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
};

// ==============================================================================
// Main App Entry Point
// ==============================================================================

function App() {
  return <BookApp />;
}

// Basic Styling
const containerStyle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  maxWidth: '600px',
  margin: '3rem auto',
  padding: '1rem',
  textAlign: 'center'
};

const cardStyle: React.CSSProperties = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  marginBottom: '2rem',
  textAlign: 'left'
};

const listItemStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: '1px solid #f1f5f9',
  display: 'flex',
  alignItems: 'center'
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #cbd5e1',
  borderRadius: '4px',
  flex: 1
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default App;