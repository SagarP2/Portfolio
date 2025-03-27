const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Get contact information
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Contact route working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact information (protected)
router.patch('/', auth, async (req, res) => {
  try {
    res.json({ message: 'Contact information updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 