const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const { auth } = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

// Create a new service (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    
    if (!title || !description || !icon) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const service = new Service({
      title,
      description,
      icon
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});

// Update a service (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, icon },
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

// Delete a service (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

module.exports = router; 