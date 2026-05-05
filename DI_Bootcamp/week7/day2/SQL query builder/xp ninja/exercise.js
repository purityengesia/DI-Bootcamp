const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serves your HTML/CSS/JS

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'quiz_db',
    password: 'your_password',
    port: 5432,
});

// GET /api/questions - Fetch all questions with their options
app.get('/api/questions', async (req, res) => {
    try {
        const query = `
            SELECT q.id, q.question, array_agg(o.option_text) as options, q.correct_answer
            FROM questions q
            JOIN questions_options qo ON q.id = qo.question_id
            JOIN options o ON qo.option_id = o.id
            GROUP BY q.id;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Quiz running at http://localhost:${PORT}`));