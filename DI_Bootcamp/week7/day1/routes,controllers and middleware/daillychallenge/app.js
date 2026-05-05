const express = require('express');
const app = express();
const quizRouter = require('./routes/quiz');

// Middleware to parse form submissions
app.use(express.urlencoded({ extended: true }));

// Mount the quiz router
app.use('/quiz', quizRouter);

// Home redirect
app.get('/', (req, res) => res.redirect('/quiz'));

app.listen(3000, () => {
    console.log('Trivia Game running at http://localhost:3000/quiz');
});