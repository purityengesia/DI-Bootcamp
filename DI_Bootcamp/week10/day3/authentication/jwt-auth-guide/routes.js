const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('./authMiddleware');

// Simulated Database
const users = [];

// REGISTER Route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 2. Create user
    const user = { 
      id: Date.now().toString(), 
      username, 
      password: hashedPassword 
    };
    
    // 3. Save to "DB"
    users.push(user);
    
    // 4. Generate Token
    const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
    
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// LOGIN Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // 1. Find user
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  // 2. Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

  // 3. Generate Token
  const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // 4. Send tokens
  res.json({ accessToken, refreshToken });
});

// Protected Route (Test)
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

module.exports = router;