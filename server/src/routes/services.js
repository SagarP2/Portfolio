const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Services route working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create service (protected)
router.post('/', auth, async (req, res) => {
  try {
    res.status(201).json({ message: 'Service created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update service (protected)
router.patch('/:id', auth, async (req, res) => {
  try {
    res.json({ message: 'Service updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete service (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 