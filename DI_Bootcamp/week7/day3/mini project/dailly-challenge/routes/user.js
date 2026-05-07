const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../users.json');

// Helper function to read users
async function readUsers() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

// Helper function to write users
async function writeUsers(users) {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

// 1. POST /register
router.post('/register', async (req, res) => {
    const { name, lastName, email, username, password } = req.body;

    // Basic validation
    if (!name || !lastName || !email || !username || !password) {
        return res.status(400).send('All fields are required.');
    }

    const users = await readUsers();

    // Check if username or email already exists
    const existingUser = users.find(u => u.username === username || u.email === email);

    if (existingUser) {
        return res.status(400).send('error1');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now().toString(),
        name,
        lastName,
        email,
        username,
        password: hashedPassword
    };

    users.push(newUser);
    await writeUsers(users);

    res.send('register');
});

// 2. POST /login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    const users = await readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(400).send('error2');
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
        res.send('login');
    } else {
        res.status(400).send('error2');
    }
});

// 3. GET /users
router.get('/users', async (req, res) => {
    const users = await readUsers();
    // Return users without passwords for security
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
});

// 4. GET /users/:id
router.get('/users/:id', async (req, res) => {
    const users = await readUsers();
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Return user without password
    const { password, ...safeUser } = user;
    res.json(safeUser);
});

// 5. PUT /users/:id
router.put('/users/:id', async (req, res) => {
    const { name, lastName, email, password } = req.body;
    const userId = req.params.id;

    let users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    // Update fields if provided
    if (name) users[userIndex].name = name;
    if (lastName) users[userIndex].lastName = lastName;
    if (email) users[userIndex].email = email;
    
    // If password is being updated, hash it
    if (password) {
        users[userIndex].password = await bcrypt.hash(password, 10);
    }

    await writeUsers(users);

    // Return updated user without password
    const { password: _, ...updatedUser } = users[userIndex];
    res.json(updatedUser);
});

module.exports = router;