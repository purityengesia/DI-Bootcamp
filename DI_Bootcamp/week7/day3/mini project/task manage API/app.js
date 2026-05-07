const express = require('express');
const path = require('path');

const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Mount router
app.use('/tasks', tasksRouter);

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err);
  if (!res.headersSent) {
    res.status(err.statusCode || 500).json({
      error: err.message || 'Internal Server Error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
