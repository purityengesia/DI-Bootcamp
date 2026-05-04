//exercise1
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let posts = [
    { id: 1, title: 'First Post', content: 'Hello World!' },
    { id: 2, title: 'Node.js', content: 'Express is great for APIs.' }
];

// GET /posts: Read all
app.get('/posts', (req, res) => {
    res.json(posts);
});

// GET /posts/:id: Read one
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
});

// POST /posts: Create
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT /posts/:id: Update
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');

    post.title = req.body.title;
    post.content = req.body.content;
    res.json(post);
});

// DELETE /posts/:id: Delete
app.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found');

    const deletedPost = posts.splice(postIndex, 1);
    res.json(deletedPost);
});

// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(port, () => {
    console.log(`Blog API listening at http://localhost:${port}`);
});

//exercise2
const express = require('express');
const app = express();
const port = 5000;

// CRITICAL: This middleware is required to parse JSON data sent in the request body
app.use(express.json());

// Simulation of a database
let books = [
    { id: 1, title: '1984', author: 'George Orwell', publishedYear: 1949 },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937 }
];

// 1. Read all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// 2. Read a specific book by ID
app.get('/api/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// 3. Create a new book (Rectified Logic)
app.post('/api/books', (req, res) => {
    // Destructuring the body for better readability
    const { title, author, publishedYear } = req.body;

    // Check if the data exists in the request
    if (!title || !author || !publishedYear) {
        return res.status(400).json({ error: "Missing required book data" });
    }

    const newBook = {
        // Safe ID generation: get the current max ID and add 1
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: title,
        author: author,
        publishedYear: publishedYear
    };

    books.push(newBook);
    
    // Send back the new book with a 201 Created status
    res.status(201).json(newBook);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Test GET: http://localhost:5000/api/books`);
});

//exercise3
//data service.js
const axios = require('axios');

const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
};

module.exports = { fetchPosts };

//app.js
const express = require('express');
const { fetchPosts } = require('./data/dataService');

const app = express();
const port = 5000;

app.get('/posts', async (req, res) => {
    try {
        const posts = await fetchPosts();
        res.json(posts);
        console.log('Data successfully retrieved and sent.');
    } catch (error) {
        res.status(500).send('Error fetching data from external API');
    }
});

app.listen(port, () => {
    console.log(`External-data server running on port ${port}`);
});

