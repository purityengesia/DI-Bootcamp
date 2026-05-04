//router.js
const express = require('express');
const router = express.Router();

// In-memory "database"
let posts = [
    { id: 1, title: "First Post", content: "Hello World!", timestamp: new Date() }
];

// GET /posts - Retrieve all posts
router.get('/', (req, res) => {
    res.status(200).json(posts);
});

// GET /posts/:id - Retrieve a specific post
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
});

// POST /posts - Create a new post
router.post('/', (req, res) => {
    const { title, content } = req.body;

    // Simple Validation
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
        timestamp: new Date()
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT /posts/:id - Update a post
router.put('/:id', (req, res) => {
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));

    if (postIndex === -1) {
        return res.status(404).json({ error: "Post not found" });
    }

    // Update only what is provided
    posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content,
        updatedAt: new Date()
    };

    res.json(posts[postIndex]);
});

// DELETE /posts/:id - Delete a post
router.delete('/:id', (req, res) => {
    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== parseInt(req.params.id));

    if (posts.length === initialLength) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
});

module.exports = router;

