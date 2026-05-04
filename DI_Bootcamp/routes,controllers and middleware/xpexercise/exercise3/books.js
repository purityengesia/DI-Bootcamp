const express = require('express');
const router = express.Router();

let books = [];

// GET all
router.get('/', (req, res) => res.json(books));

// POST
router.post('/', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id == id);
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...req.body };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id != id);
    res.status(204).send();
});

module.exports = router;