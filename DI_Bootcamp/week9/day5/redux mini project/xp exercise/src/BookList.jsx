import { useState } from 'react'; // Removed 'React'
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks,
} from './booksSelectors';

const BookList = () => {
  // Local state to track which genre filter is active
  const [currentGenre, setCurrentGenre] = useState('All');

  // Select data from the store using the created selectors
  const allBooks = useSelector(selectBooks);
  const horrorBooks = useSelector(selectHorrorBooks);
  const fantasyBooks = useSelector(selectFantasyBooks);
  const sciFiBooks = useSelector(selectScienceFictionBooks);

  // Helper to determine which list to render based on local state
  const getBooksToDisplay = () => {
    switch (currentGenre) {
      case 'Horror':
        return horrorBooks;
      case 'Fantasy':
        return fantasyBooks;
      case 'Science Fiction':
        return sciFiBooks;
      default:
        return allBooks;
    }
  };

  const displayBooks = getBooksToDisplay();

  return (
    <div style={styles.container}>
      <h2>📚 Book Inventory</h2>

      {/* Genre Selection Controls */}
      <div style={styles.controls}>
        <button 
          style={currentGenre === 'All' ? styles.activeBtn : styles.btn}
          onClick={() => setCurrentGenre('All')}
        >
          All Books
        </button>
        <button 
          style={currentGenre === 'Horror' ? styles.activeBtn : styles.btn}
          onClick={() => setCurrentGenre('Horror')}
        >
          Horror
        </button>
        <button 
          style={currentGenre === 'Fantasy' ? styles.activeBtn : styles.btn}
          onClick={() => setCurrentGenre('Fantasy')}
        >
          Fantasy
        </button>
        <button 
          style={currentGenre === 'Science Fiction' ? styles.activeBtn : styles.btn}
          onClick={() => setCurrentGenre('Science Fiction')}
        >
          Sci-Fi
        </button>
      </div>

      {/* Book List Display */}
      <div style={styles.listContainer}>
        {displayBooks.length > 0 ? (
          displayBooks.map((book) => (
            <div key={book.id} style={styles.card}>
              <h3 style={styles.title}>{book.title}</h3>
              <p style={styles.author}>by {book.author}</p>
              <span style={styles.badge}>{book.genre}</span>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

// Simple inline styles for demonstration
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' },
  controls: { marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' },
  btn: { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px' },
  activeBtn: { padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' },
  listContainer: { display: 'grid', gap: '10px' },
  card: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  title: { margin: '0 0 5px 0', color: '#333' },
  author: { margin: '0 0 10px 0', color: '#666', fontStyle: 'italic' },
  badge: { display: 'inline-block', padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '0.8rem', color: '#555' }
};

export default BookList;