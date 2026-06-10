const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // 1. Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token found

  // 2. Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    
    req.user = user; // Attach user info to request
    next(); // Proceed to the next route
  });
};

module.exports = { authenticateToken };