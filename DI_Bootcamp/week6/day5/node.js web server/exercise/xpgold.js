//exercise1
const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());

const EXTERNAL_API = 'https://jsonplaceholder.typicode.com/posts';

// GET all posts
app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get(EXTERNAL_API);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// GET single post
app.get('/api/posts/:id', async (req, res) => {
    try {
        const response = await axios.get(`${EXTERNAL_API}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: "Post not found" });
    }
});

// POST create post
app.post('/api/posts', async (req, res) => {
    try {
        const response = await axios.post(EXTERNAL_API, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(400).json({ error: "Could not create post" });
    }
});

// PUT update post
app.put('/api/posts/:id', async (req, res) => {
    try {
        const response = await axios.put(`${EXTERNAL_API}/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: "Update failed" });
    }
});

// DELETE post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        await axios.delete(`${EXTERNAL_API}/${req.params.id}`);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Delete failed" });
    }
});

app.listen(port, () => console.log(`Proxy API running on port ${port}`));

//exercise2
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

app.use(express.json());

const users = []; // Temporary in-memory database
const SECRET_KEY = 'super_secret_ninja_key';

// Registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Missing data");

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send("User registered!");
});

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// Profile (Protected)
app.get('/api/profile', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send("Invalid token");
        res.json({ message: `Welcome to your profile, ${decoded.username}!` });
    });
});

app.listen(port, () => console.log(`Auth server running on port ${port}`));

//exercise3
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let todos = [
    { id: 1, title: "Learn Express", completed: false }
];

// Routes
app.get('/api/todos', (req, res) => res.json(todos));

app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    todo ? res.json(todo) : res.status(404).send("Todo not found");
});

app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        title: req.body.title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("Not found");

    todo.title = req.body.title !== undefined ? req.body.title : todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Not found");
    
    todos.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => console.log(`Todo API listening on port ${port}`));