const express = require('express');
const router = express.Router();

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// GET / - Display the form
router.get('/', (req, res) => {
    let emojiOptions = emojis.map(e => `<option value="${e}">${e}</option>`).join('');
    
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Emoji greeter</h1>
            <form action="/greet" method="POST">
                <input type="text" name="name" placeholder="Enter your name" required style="padding: 10px;">
                <select name="emoji" style="padding: 10px;">
                    ${emojiOptions}
                </select>
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Greet Me!</button>
            </form>
        </div>
    `);
});

// POST /greet - Process submission
router.post('/greet', (req, res) => {
    const { name, emoji } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).send("<h1>Error: Name is required!</h1><a href='/'>Go back</a>");
    }

    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px; border: 2px solid #ddd; padding: 20px; display: inline-block;">
            <h1 style="color: #2c3e50;">Hello, ${name}! ${emoji}</h1>
            <p>Welcome to our Express Emoji App.</p>
            <a href="/" style="text-decoration: none; color: blue;">Try again</a>
        </div>
    `);
});

module.exports = router;