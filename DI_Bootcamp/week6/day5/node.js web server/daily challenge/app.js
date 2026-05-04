const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
``
// Game Data
const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🎸', name: 'Guitar' },
    { emoji: '🦄', name: 'Unicorn' },
    { emoji: '👻', name: 'Ghost' },
    { emoji: '🥑', name: 'Avocado' },
    { emoji: '🧊', name: 'Ice' }
];

let leaderboard = [];

// --- API ROUTES ---

// Get a new random emoji and options
app.get('/api/next', (req, res) => {
    const correctIdx = Math.floor(Math.random() * emojis.length);
    const correctEmoji = emojis[correctIdx];
    
    // Generate 3 wrong options
    let options = [correctEmoji.name];
    while (options.length < 4) {
        let randomName = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(randomName)) {
            options.push(randomName);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    res.json({
        emoji: correctEmoji.emoji,
        options: options,
        id: correctIdx
    });
});

// Verify guess
app.post('/api/guess', (req, res) => {
    const { id, guess } = req.body;
    const isCorrect = emojis[id].name === guess;
    res.json({ 
        success: isCorrect, 
        correctName: emojis[id].name 
    });
});

// Leaderboard update
app.post('/api/leaderboard', (req, res) => {
    const { name, score } = req.body;
    if (name) {
        leaderboard.push({ name, score });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 5);
    }
    res.json(leaderboard);
});

// --- FRONTEND (HTML) ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Emoji Guessing Game</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f8f9fa; }
            .card { background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; width: 350px; }
            #emoji { font-size: 80px; margin: 20px 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
            button { padding: 12px; border: 2px solid #eee; border-radius: 10px; background: white; cursor: pointer; font-size: 16px; transition: all 0.2s; }
            button:hover { border-color: #007bff; background: #f0f7ff; }
            #score { color: #007bff; font-weight: bold; font-size: 20px; }
            #feedback { margin-top: 20px; font-weight: bold; height: 20px; }
            .leaderboard { margin-top: 20px; font-size: 14px; border-top: 1px solid #eee; padding-top: 10px; text-align: left; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>Emoji Guess!</h2>
            <div>Score: <span id="score">0</span></div>
            <div id="emoji">?</div>
            <div id="options" class="grid"></div>
            <div id="feedback"></div>
            <div class="leaderboard">
                <strong>Top 5 Scores:</strong>
                <div id="leaders"></div>
            </div>
        </div>

        <script>
            let score = 0;
            let currentId = null;

            async function nextRound() {
                const res = await fetch('/api/next');
                const data = await res.json();
                currentId = data.id;
                document.getElementById('emoji').innerText = data.emoji;
                
                const container = document.getElementById('options');
                container.innerHTML = '';
                data.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.innerText = opt;
                    btn.onclick = () => submitGuess(opt);
                    container.appendChild(btn);
                });
            }

            async function submitGuess(guess) {
                const res = await fetch('/api/guess', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ id: currentId, guess })
                });
                const result = await res.json();
                const fb = document.getElementById('feedback');

                if (result.success) {
                    score++;
                    fb.innerText = "Correct! 🌟";
                    fb.style.color = "green";
                } else {
                    fb.innerText = "Wrong! It was " + result.correctName;
                    fb.style.color = "red";
                    await updateLeaderboard();
                    score = 0;
                }

                document.getElementById('score').innerText = score;
                setTimeout(nextRound, 1500);
            }

            async function updateLeaderboard() {
                if (score > 0) {
                    const name = prompt("Game Over! Score: " + score + ". Enter your name:");
                    const res = await fetch('/api/leaderboard', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ name, score })
                    });
                    const list = await res.json();
                    document.getElementById('leaders').innerHTML = list.map(l => "<div>" + l.name + ": " + l.score + "</div>").join('');
                }
            }

            nextRound();
        </script>
    </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log("Emoji game running at http://localhost:" + port);
});