const express = require('express');
const app = express();
const postsRouter = require('./routes/posts');

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the router at the /posts path
app.use('/posts', postsRouter);

// Global Error Handler (Catch-all)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Blog API running on http://localhost:${PORT}`);
});


