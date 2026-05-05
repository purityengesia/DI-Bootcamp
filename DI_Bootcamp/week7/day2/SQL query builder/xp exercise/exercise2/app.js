const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// --- [DATABASE/DATA SECTION] ---
// Exercise asks for a table definition, but logic usually points to an array for basic CRUD.
// If using PostgreSQL, you would run: 
// CREATE TABLE books (id SERIAL PRIMARY KEY, title TEXT, author TEXT, publishedYear INT);

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925 },
    { id: 2, title: "1984", author: "George Orwell", publishedYear: 1949 }
];

// --- [ROUTES & CONTROLLERS] ---

/**
 * @route   GET /api/books
 * @desc    Read all books
 */
app.get('/api/books', (req, res) => {
    try {
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @route   GET /api/books/:bookId
 * @desc    Read a specific book by ID
 */
app.get('/api/books/:bookId', (req, res) => {
    const { bookId } = req.params;
    
    // Find book by ID (convert bookId string to number)
    const book = books.find(b => b.id === parseInt(bookId));

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

/**
 * @route   POST /api/books
 * @desc    Create a new book
 */
app.post('/api/books', (req, res) => {
    const { title, author, publishedYear } = req.body;

    // Basic validation
    if (!title || !author || !publishedYear) {
        return res.status(400).json({ message: "Please provide title, author, and publishedYear" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        publishedYear
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// --- [SERVER SETUP] ---

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🔗 Access it at http://localhost:${PORT}/api/books`);
});