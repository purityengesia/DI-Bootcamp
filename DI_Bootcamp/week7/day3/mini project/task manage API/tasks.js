const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

// Utility: read tasks from file
function readTasksFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(TASKS_FILE, 'utf8', (err, data) => {
      if (err) {
        return reject(new Error('Failed to read tasks file'));
      }
      try {
        const tasks = JSON.parse(data || '[]');
        resolve(tasks);
      } catch (parseErr) {
        reject(new Error('Failed to parse tasks file'));
      }
    });
  });
}

// Utility: write tasks to file
function writeTasksFile(tasks) {
  return new Promise((resolve, reject) => {
    fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(new Error('Failed to write tasks file'));
      }
      resolve();
    });
  });
}

// Basic validation middleware for create/update
function validateTask(req, res, next) {
  const { title, description, completed } = req.body;

  // title is required for create; for update we allow missing fields (partial update)
  if (req.method === 'POST') {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'title is required and must be a non-empty string' });
    }
  }

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'title must be a non-empty string' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'description must be a string' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be a boolean' });
  }

  next();
}

// Helper: generate next ID (simple numeric)
async function generateNextId() {
  const tasks = await readTasksFile();
  const maxId = tasks.reduce((max, task) => {
    const idNum = Number(task.id);
    return idNum > max ? idNum : max;
  }, 0);
  return String(maxId + 1);
}

/**
 * GET /tasks
 * Retrieve all tasks
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await readTasksFile();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /tasks/:id
 * Retrieve task by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await readTasksFile();
    const task = tasks.find((t) => String(t.id) === String(id));

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /tasks
 * Create a new task
 * Body: { title: string (required), description?: string, completed?: boolean }
 */
router.post('/', validateTask, async (req, res) => {
  const { title, description = '', completed = false } = req.body;

  try {
    const tasks = await readTasksFile();
    const newId = await generateNextId();

    const newTask = {
      id: newId,
      title: title.trim(),
      description,
      completed,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeTasksFile(tasks);

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /tasks/:id
 * Update a task by ID (full or partial)
 * Body: { title?: string, description?: string, completed?: boolean }
 */
router.put('/:id', validateTask, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const tasks = await readTasksFile();
    const index = tasks.findIndex((t) => String(t.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = tasks[index];

    // Apply updates only if provided
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    task.updatedAt = new Date().toISOString();
    tasks[index] = task;

    await writeTasksFile(tasks);

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /tasks/:id
 * Delete task by ID
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await readTasksFile();
    const index = tasks.findIndex((t) => String(t.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const [deletedTask] = tasks.splice(index, 1);
    await writeTasksFile(tasks);

    res.json({ message: 'Task deleted', task: deletedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
