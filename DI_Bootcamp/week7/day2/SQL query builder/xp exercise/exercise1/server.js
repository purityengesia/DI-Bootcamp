const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// --- [CONFIG SECTION] ---
// Database connection setup
const pool = new Pool({
    user: 'your_postgres_user', 
    host: 'localhost',
    database: 'blog_api',
    password: 'your_password',
    port: 5432,
});

// --- [MODELS SECTION] ---
// These functions handle raw SQL queries
const db = {
    findAll: () => pool.query('SELECT * FROM posts ORDER BY id ASC'),
    findById: (id) => pool.query('SELECT * FROM posts WHERE id = $1', [id]),
    create: (title, content) => pool.query(
        'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *', 
        [title, content]
    ),
    update: (id, title, content) => pool.query(
        'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
        [title, content, id]
    ),
    delete: (id) => pool.query('DELETE FROM posts WHERE id = $1', [id])
};

// --- [CONTROLLERS & ROUTES SECTION] ---

// GET /posts: Return all posts
app.get('/posts', async (req, res) => {
    try {
        const result = await db.findAll();
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching posts" });
    }
});

// GET /posts/:id: Return a specific post
app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.findById(id);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching post" });
    }
});

// POST /posts: Create a new post
app.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const result = await db.create(title, content);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error creating post" });
    }
});

// PUT /posts/:id: Update a post
app.put('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await db.update(id, title, content);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post not found to update" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error updating post" });
    }
});

// DELETE /posts/:id: Delete a post
app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.delete(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error deleting post" });
    }
});

// --- [ERROR HANDLING] ---
// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Blog API running at http://localhost:${PORT}`);
});