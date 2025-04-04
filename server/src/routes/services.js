const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const { auth } = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all services...');
    const services = await Service.find()
      .select('-__v')
      .sort({ createdAt: -1 });
    
    console.log('Services found:', services.length);
    res.json({ 
      success: true, 
      data: services,
      message: 'Services fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching services', 
      error: error.message 
    });
  }
});

// Get service by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    console.log('Fetching service by slug:', req.params.slug);
    const service = await Service.findOne({ slug: req.params.slug })
      .select('-__v');
    
    if (!service) {
      console.log('Service not found for slug:', req.params.slug);
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found' 
      });
    }
    
    console.log('Service found:', service.title);
    res.json({ 
      success: true, 
      data: service,
      message: 'Service fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching service', 
      error: error.message 
    });
  }
});

// Get all sub-services for a service
router.get('/:serviceId/subservices', async (req, res) => {
  try {
    console.log('Fetching sub-services for service:', req.params.serviceId);
    const subServices = await SubService.find({ serviceId: req.params.serviceId })
      .select('-__v')
      .sort({ order: 1 });
    
    console.log('Sub-services found:', subServices.length);
    res.json({ 
      success: true, 
      data: subServices,
      message: 'Sub-services fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching sub-services:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching sub-services', 
      error: error.message 
    });
  }
});

// Create a new service
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating new service:', req.body);
    const service = new Service(req.body);
    await service.save();
    
    console.log('Service created successfully:', service.title);
    res.status(201).json({ 
      success: true, 
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error creating service', 
      error: error.message 
    });
  }
});

// Update a service
router.put('/:id', auth, async (req, res) => {
  try {
    console.log('Updating service:', req.params.id);
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!service) {
      console.log('Service not found for update:', req.params.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found' 
      });
    }
    
    console.log('Service updated successfully:', service.title);
    res.json({ 
      success: true, 
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error updating service', 
      error: error.message 
    });
  }
});

// Delete a service
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Deleting service:', req.params.id);
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      console.log('Service not found for deletion:', req.params.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found' 
      });
    }
    
    // Delete all associated sub-services
    await SubService.deleteMany({ serviceId: req.params.id });
    
    console.log('Service and sub-services deleted successfully');
    res.json({ 
      success: true, 
      message: 'Service and associated sub-services deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting service', 
      error: error.message 
    });
  }
});

module.exports = router; 