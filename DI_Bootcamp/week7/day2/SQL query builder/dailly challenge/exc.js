const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex');
require('dotenv').config();

const app = express();
app.use(express.json());

// --- 1. DATABASE CONFIGURATION ---
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'user_db',
  },
});

// --- 2. DATABASE MODELS (Logic & Transactions) ---
const userModel = {
  // Requirement: Use transaction to add a user
  registerUserTransaction: async (userData) => {
    return await db.transaction(async (trx) => {
      // Insert into users table
      const [user] = await trx('users')
        .insert({
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name
        })
        .returning('*');

      // Insert into hashpwd table
      await trx('hashpwd').insert({
        username: userData.username,
        password: userData.password // This is the hashed version
      });

      return user;
    });
  },

  findHashByUsername: (username) => db('hashpwd').where({ username }).first(),
  getAllUsers: () => db('users').select('*'),
  getUserById: (id) => db('users').where({ id }).first(),
  updateUser: (id, data) => db('users').where({ id }).update(data).returning('*')
};

// --- 3. CONTROLLERS (Request Handling) ---
const userController = {
  register: async (req, res) => {
    try {
      const { username, password, email, first_name, last_name } = req.body;
      // Requirement: Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await userModel.registerUserTransaction({
        username, email, first_name, last_name, password: hashedPassword
      });
      
      res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Registration failed", details: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const record = await userModel.findHashByUsername(username);
      
      if (!record) return res.status(404).json({ message: "User not found" });

      // Requirement: Compare hashed password with provided password
      const match = await bcrypt.compare(password, record.password);
      if (match) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUsers: async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
  },

  getUser: async (req, res) => {
    const user = await userModel.getUserById(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
  },

  update: async (req, res) => {
    try {
      const updated = await userModel.updateUser(req.params.id, req.body);
      res.json({ message: "User updated", user: updated });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// --- 4. ROUTES ---
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.update);

app.use('/', router);

// --- 5. SERVER START ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`User Management API running on http://localhost:${PORT}`);
});