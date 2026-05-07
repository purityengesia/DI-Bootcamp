const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

// Game State
let gameState = {
    gridSize: 10,
    players: {
        p1: { pos: { x: 0, y: 0 }, base: { x: 0, y: 0 }, name: "Blue" },
        p2: { pos: { x: 9, y: 9 }, base: { x: 9, y: 9 }, name: "Red" }
    },
    turn: 'p1', // p1 goes first
    obstacles: [{ x: 5, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 4 }], // Example obstacles
    winner: null
};

// GET: Current game state
app.get('/game/state', (req, res) => res.json(gameState));

// POST: Make a move
app.post('/game/move', (req, res) => {
    const { player, direction } = req.body; // direction: 'up', 'down', 'left', 'right'

    if (gameState.winner) return res.status(400).json({ m: "Game over" });
    if (player !== gameState.turn) return res.status(403).json({ m: "Not your turn" });

    let currentPos = { ...gameState.players[player].pos };

    // Calculate New Position
    if (direction === 'up') currentPos.y--;
    if (direction === 'down') currentPos.y++;
    if (direction === 'left') currentPos.x--;
    if (direction === 'right') currentPos.x++;

    // Validation 1: Boundaries
    if (currentPos.x < 0 || currentPos.x >= 10 || currentPos.y < 0 || currentPos.y >= 10) {
        return res.status(400).json({ m: "Out of bounds" });
    }

    // Validation 2: Obstacles
    const hitObstacle = gameState.obstacles.some(o => o.x === currentPos.x && o.y === currentPos.y);
    if (hitObstacle) return res.status(400).json({ m: "Path blocked" });

    // Update Position
    gameState.players[player].pos = currentPos;

    // Check Win Condition
    const opponent = player === 'p1' ? 'p2' : 'p1';
    if (currentPos.x === gameState.players[opponent].base.x && currentPos.y === gameState.players[opponent].base.y) {
        gameState.winner = player;
    }

    // Switch Turn
    gameState.turn = opponent;

    res.json(gameState);
});

// POST: Reset Game
app.post('/game/reset', (req, res) => {
    gameState.players.p1.pos = { x: 0, y: 0 };
    gameState.players.p2.pos = { x: 9, y: 9 };
    gameState.turn = 'p1';
    gameState.winner = null;
    res.json(gameState);
});

app.listen(3000, () => console.log("Game server: http://localhost:3000"));