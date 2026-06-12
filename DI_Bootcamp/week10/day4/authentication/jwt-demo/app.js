const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001; // Using port 3001 to avoid conflicts
const JWT_SECRET = 'my_super_secret_key_123';

// --- MIDDLEWARE ---
app.use(express.json()); // Allows us to read JSON data sent in requests
app.use(cookieParser()); // Allows us to read cookies

// --- MOCK DATABASE ---
const users = [];

// --- ROUTES ---

// 1. ROOT ROUTE (Fixes "Cannot GET /")
app.get('/', (req, res) => {
    res.send('🚀 JWT Server is Running! <br><br> Use Thunder Client or Postman to test: <br> - POST /register <br> - POST /login <br> - GET /dashboard');
});

// 2. REGISTER ROUTE
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Simple validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if user exists
        const existingUser = users.find(u => u.username === username);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = { id: Date.now(), username, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

// 3. LOGIN ROUTE
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = users.find(u => u.username === username);
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(403).json({ message: 'Invalid password' });

        // Generate JWT (Access Token)
        const accessToken = jwt.sign(
            { id: user.id, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Set token in HTTP-Only Cookie
        res.cookie('token', accessToken, { 
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        res.json({ message: 'Logged in successfully', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

// 4. MIDDLEWARE TO PROTECT ROUTES
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user; // Attach user info to request
        next();
    });
};

// 5. PROTECTED DASHBOARD ROUTE
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ 
        message: `Welcome to the dashboard, ${req.user.username}!`, 
        userId: req.user.id 
    });
});

// 6. LOGOUT ROUTE
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});