const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json()); // Essential for parsing POST/PUT bodies

// --- [SECTION: CONFIG / DATABASE CONNECTION] ---
// Configure your PostgreSQL credentials here
const pool = new Pool({
    user: 'your_postgres_user',
    host: 'localhost',
    database: 'todo_db',
    password: 'your_password',
    port: 5432,
});

// --- [SECTION: MODELS / DATA LAYER] ---
// SQL queries for the 'tasks' table
const TaskModel = {
    getAll: () => pool.query('SELECT * FROM tasks ORDER BY id ASC'),
    getOne: (id) => pool.query('SELECT * FROM tasks WHERE id = $1', [id]),
    create: (title) => pool.query(
        'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *', 
        [title]
    ),
    update: (id, title, completed) => pool.query(
        'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
        [title, completed, id]
    ),
    delete: (id) => pool.query('DELETE FROM tasks WHERE id = $1', [id])
};

// --- [SECTION: ROUTES & CONTROLLERS] ---

// POST /api/todos - Create a new todo
app.post('/api/todos', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });
        
        const result = await TaskModel.create(title);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// GET /api/todos - Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const result = await TaskModel.getAll();
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// GET /api/todos/:id - Get a specific todo
app.get('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TaskModel.getOne(id);
        if (result.rows.length === 0) return res.status(404).json({ error: "Todo not found" });
        
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Invalid ID format or Server error" });
    }
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        
        const result = await TaskModel.update(id, title, completed);
        if (result.rowCount === 0) return res.status(404).json({ error: "Todo not found" });
        
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TaskModel.delete(id);
        if (result.rowCount === 0) return res.status(404).json({ error: "Todo not found" });
        
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});

// --- [SECTION: ERROR HANDLING] ---
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Todo API is running on http://localhost:${PORT}`);
});