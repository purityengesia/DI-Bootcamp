const express = require('express');
const router = express.Router();

let todos = []; // Our temporary database

// GET all
router.get('/', (req, res) => res.json(todos));

// POST new
router.post('/', (req, res) => {
    const newTodo = { id: Date.now(), task: req.body.task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT (Update)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id);
    if (todo) {
        todo.task = req.body.task;
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.send('Deleted successfully');
});

module.exports = router;