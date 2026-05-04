const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// --- DATA: The Questions ---
const quizQuestions = [
    {
        id: 0,
        question: "Which of the following is a Node.js web framework?",
        options: ["Django", "Express", "Laravel", "Flask"],
        answer: 1 
    },
    {
        id: 1,
        question: "What command is used to initialize a Node project?",
        options: ["npm start", "node init", "npm init", "git init"],
        answer: 2
    },
    {
        id: 2,
        question: "Which module is used to handle file systems in Node?",
        options: ["fs", "path", "http", "os"],
        answer: 0
    },
    {
        id: 3,
        question: "What is the default port for many Node.js apps?",
        options: ["80", "443", "3000", "8080"],
        answer: 2
    }
];

// --- API: Routes ---

// 1. Get questions (hiding the answer index)
app.get('/api/questions', (req, res) => {
    const safeData = quizQuestions.map(({ answer, ...rest }) => rest);
    res.json(safeData);
});

// 2. Check the answer
app.post('/api/check', (req, res) => {
    const { questionId, choice } = req.body;
    const question = quizQuestions.find(q => q.id === questionId);
    
    if (!question) return res.status(404).json({ error: "Question not found" });

    const isCorrect = question.answer === choice;
    res.json({ 
        correct: isCorrect, 
        correctAnswer: question.options[question.answer] 
    });
});

// --- VIEW: The HTML Frontend ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Express Quiz Game</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f2f5; }
            .quiz-card { background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 400px; text-align: center; }
            .option-btn { display: block; width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #eee; border-radius: 8px; background: white; cursor: pointer; font-size: 16px; transition: 0.2s; }
            .option-btn:hover { border-color: #007bff; background: #f0f7ff; }
            #feedback { margin: 15px 0; font-weight: bold; height: 24px; }
            .score-text { font-size: 1.2rem; color: #007bff; margin-bottom: 20px; }
            .hidden { display: none; }
        </style>
    </head>
    <body>
        <div class="quiz-card">
            <div id="game-ui">
                <div class="score-text">Current Score: <span id="live-score">0</span></div>
                <h2 id="q-text">Loading...</h2>
                <div id="options-list"></div>
                <div id="feedback"></div>
            </div>
            <div id="result-ui" class="hidden">
                <h1>Game Over!</h1>
                <p style="font-size: 1.5rem;">Final Score: <span id="final-score"></span></p>
                <button onclick="location.reload()" style="padding: 10px 20px; cursor: pointer;">Play Again</button>
            </div>
        </div>

        <script>
            let currentQuestions = [];
            let index = 0;
            let score = 0;

            async function start() {
                const response = await fetch('/api/questions');
                currentQuestions = await response.json();
                render();
            }

            function render() {
                if (index >= currentQuestions.length) {
                    document.getElementById('game-ui').classList.add('hidden');
                    document.getElementById('result-ui').classList.remove('hidden');
                    document.getElementById('final-score').innerText = score + " / " + currentQuestions.length;
                    return;
                }

                const q = currentQuestions[index];
                document.getElementById('q-text').innerText = q.question;
                const list = document.getElementById('options-list');
                list.innerHTML = '';
                
                q.options.forEach((opt, i) => {
                    const btn = document.createElement('button');
                    btn.className = 'option-btn';
                    btn.innerText = opt;
                    btn.onclick = () => submit(i);
                    list.appendChild(btn);
                });
            }

            async function submit(choice) {
                // Disable buttons so user can't double-click
                document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

                const response = await fetch('/api/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ questionId: currentQuestions[index].id, choice: choice })
                });
                const result = await response.json();
                
                const fb = document.getElementById('feedback');
                if (result.correct) {
                    score++;
                    fb.innerText = "Correct! 🎯";
                    fb.style.color = "green";
                } else {
                    fb.innerText = "Wrong! It was: " + result.correctAnswer;
                    fb.style.color = "red";
                }

                document.getElementById('live-score').innerText = score;

                setTimeout(() => {
                    fb.innerText = "";
                    index++;
                    render();
                }, 1500);
            }

            start();
        </script>
    </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log("-----------------------------------------");
    console.log("Quiz Game is live at: http://localhost:3000");
    console.log("-----------------------------------------");
});