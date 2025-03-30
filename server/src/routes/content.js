const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const Content = require('../models/Content');

// Get all content
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
    res.status(500).json({ 
      message: 'Failed to fetch contents',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single content
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ 
      message: 'Failed to fetch content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Create content (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    console.log('Received content creation request');
    console.log('Request body:', req.body);
    console.log('User:', req.user);

    // Validate required fields
    if (!req.body.title || !req.body.content || !req.body.author || !req.body.date) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['title', 'content', 'author', 'date']
      });
    }

    // Create content object
    const contentData = {
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      author: req.body.author.trim(),
      date: req.body.date,
      tags: Array.isArray(req.body.tags) ? req.body.tags : []
    };

    console.log('Content data to save:', contentData);

    const content = new Content(contentData);
    await content.save();
    
    console.log('Content saved successfully:', content);
    res.status(201).json(content);
  } catch (error) {
    console.error('Error creating content:', error);
    console.error('Error stack:', error.stack);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to create content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update content (admin only)
router.patch('/:id', auth, isAdmin, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'content', 'author', 'date', 'tags'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates' });
  }

  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    updates.forEach(update => {
      if (update === 'tags') {
        content[update] = JSON.parse(req.body[update]);
      } else {
        content[update] = req.body[update];
      }
    });

    await content.save();
    res.json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(400).json({ 
      message: 'Failed to update content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete content (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ 
      message: 'Failed to delete content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 