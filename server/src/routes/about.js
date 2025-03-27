const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Get about content
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'About route working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update about content (protected)
router.patch('/', auth, async (req, res) => {
  try {
    res.json({ message: 'About content updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 