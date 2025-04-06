const express = require('express');
const router = express.Router();
const Service = require('../../models/Service');
const SubService = require('../../models/SubService');
const auth = require('../../middleware/auth');

// @route   GET api/services
// @desc    Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/services/:id
// @desc    Get a single service with sub-services
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/services
// @desc    Create a service
router.post('/', auth, async (req, res) => {
    const { title, description, icon, slug, subServices } = req.body;

    try {
        const newService = new Service({
            title,
            description,
            icon,
            slug,
            subServices: subServices || [] // Store sub-services directly
        });

        const service = await newService.save();
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/services/:id
// @desc    Update a service
router.put('/:id', auth, async (req, res) => {
    const { title, description, icon, slug, subServices } = req.body;

    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        // Update service fields
        service.title = title || service.title;
        service.description = description || service.description;
        service.icon = icon || service.icon;
        service.slug = slug || service.slug;
        service.subServices = subServices || service.subServices; // Update sub-services

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/services/:id
// @desc    Delete a service and its sub-services
router.delete('/:id', auth, async (req, res) => {
    try {
        // Delete all sub-services associated with this service
        await SubService.deleteMany({ serviceId: req.params.id });
        
        // Delete the service
        await Service.findByIdAndDelete(req.params.id);
        
        res.json({ msg: 'Service and associated sub-services deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;