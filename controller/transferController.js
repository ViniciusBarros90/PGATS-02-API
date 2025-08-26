const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const { authenticateToken } = require('../service/authService');


router.post('/', authenticateToken, (req, res) => {
  try {
    const transfer = transferService.transfer(req.body);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', authenticateToken, (req, res) => {
  res.json(transferService.getTransfers());
transferController.test
  res.status(405).json({ error: 'Method Not Allowed' });
});

module.exports = router;
