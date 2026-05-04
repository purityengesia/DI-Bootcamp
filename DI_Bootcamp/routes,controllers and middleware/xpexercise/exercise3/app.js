const express = require('express');
const app = express();
const bookRouter = require('./routes/books');

app.use(express.json());
app.use('/books', bookRouter);

app.listen(3000, () => console.log('Book API running on port 3000'));