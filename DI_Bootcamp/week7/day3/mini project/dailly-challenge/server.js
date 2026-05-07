const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the user routes
app.use('/', userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});