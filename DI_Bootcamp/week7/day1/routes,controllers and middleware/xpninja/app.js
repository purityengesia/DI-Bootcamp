const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

// Middleware to parse form data (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Mount the router
app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Emoji App running at http://localhost:3000');
});