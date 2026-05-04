const express = require('express');
const app = express();
const todoRouter = require('./routes/todos');

app.use(express.json()); // Essential for POST/PUT requests
app.use('/todos', todoRouter);

app.listen(3000, () => console.log('Todo API running on port 3000'));