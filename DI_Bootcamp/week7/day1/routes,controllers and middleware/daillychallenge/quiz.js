const express = require('express');
const router = express.Router();

const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" },
];

// Game State (Global for this exercise)
let currentQuestionIndex = 0;
let score = 0;

// GET /quiz - Start or show the current question
router.get('/', (req, res) => {
    // If we've answered all questions, redirect to score
    if (currentQuestionIndex >= triviaQuestions.length) {
        return res.redirect('/quiz/score');
    }

    const currentQ = triviaQuestions[currentQuestionIndex];

    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h2>Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}</h2>
            <p style="font-size: 1.2rem;">${currentQ.question}</p>
            <form action="/quiz" method="POST">
                <input type="text" name="userAnswer" placeholder="Your answer" required autofocus style="padding: 8px;">
                <button type="submit" style="padding: 8px 15px; cursor: pointer;">Submit</button>
            </form>
            <p>Current Score: ${score}</p>
        </div>
    `);
});

// POST /quiz - Process answer and move to next
router.post('/', (req, res) => {
    const { userAnswer } = req.body;
    const correctAnswer = triviaQuestions[currentQuestionIndex].answer;

    let feedback = "";
    if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
        score++;
        feedback = `<h2 style="color: green;">Correct! 🎉</h2>`;
    } else {
        feedback = `<h2 style="color: red;">Incorrect. 😢</h2><p>The correct answer was: <b>${correctAnswer}</b></p>`;
    }

    currentQuestionIndex++;

    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            ${feedback}
            <a href="/quiz" style="display: inline-block; margin-top: 20px; text-decoration: none; background: #3498db; color: white; padding: 10px 20px; border-radius: 5px;">Next Question</a>
        </div>
    `);
});

// GET /quiz/score - Final result
router.get('/score', (req, res) => {
    const finalScore = score;
    const total = triviaQuestions.length;
    
    // Reset the game for the next time it's played
    score = 0;
    currentQuestionIndex = 0;

    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Quiz Complete!</h1>
            <p style="font-size: 1.5rem;">Your final score: <strong>${finalScore} / ${total}</strong></p>
            <a href="/quiz" style="text-decoration: none; color: blue;">Restart Game</a>
        </div>
    `);
});

module.exports = router;