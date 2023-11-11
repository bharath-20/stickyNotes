
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { registerUser, loginUser } = require('../models/auth'); // Update with the correct path

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (role !== 'ADMIN' && role !== 'USER') {
      return res.status(400).json({ error: 'Invalid role. Role must be either "ADMIN" or "USER"' });
    }
    const userId = uuidv4();
    const result = await registerUser(userId, name, email, password, role);
    res.status(201).json(result );
  } catch (error) {
    if (error.message === 'Email already exists') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
