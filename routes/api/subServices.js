const express = require('express');
const router = express.Router();
const SubService = require('../../models/SubService');
const auth = require('../../middleware/auth');

// @route   POST api/subservices
// @desc    Create a sub-service
router.post('/', auth, async (req, res) => {
    try {
        const { serviceId, title, description, imageUrl } = req.body;
        const subService = new SubService({
            serviceId,
            title,
            description,
            imageUrl
        });
        await subService.save();
        res.json(subService);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/subservices/:serviceId
// @desc    Get all sub-services for a service
router.get('/:serviceId', async (req, res) => {
    try {
        const subServices = await SubService.find({ serviceId: req.params.serviceId });
        res.json(subServices);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/subservices/:id
// @desc    Update a sub-service
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const subService = await SubService.findByIdAndUpdate(
            req.params.id,
            { title, description, imageUrl },
            { new: true }
        );
        res.json(subService);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/subservices/:id
// @desc    Delete a sub-service
router.delete('/:id', auth, async (req, res) => {
    try {
        await SubService.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Sub-service deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
