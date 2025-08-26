const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { generateToken } = require('../service/authService');

router.post('/register', (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const user = userService.loginUser(req.body);
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(userService.getAllUsers());

  res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
