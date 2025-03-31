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

    const { title, content, author, date, image, tags } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!content) missingFields.push('content');
    if (!author) missingFields.push('author');
    if (!date) missingFields.push('date');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        missingFields,
        receivedData: req.body
      });
    }

    // Validate image URL if provided
    if (image) {
      try {
        new URL(image);
      } catch (error) {
        return res.status(400).json({ 
          message: 'Invalid image URL',
          details: 'Please provide a valid image URL'
        });
      }
    }

    // Create content object
    const contentData = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      date,
      ...(image && { image }), // Only include image if it's provided
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [])
    };

    console.log('Content data to save:', contentData);

    const newContent = new Content(contentData);
    await newContent.save();
    
    console.log('Content saved successfully:', newContent);
    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    console.error('Error stack:', error.stack);
    
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
  try {
    console.log('Received update request for content ID:', req.params.id);
    console.log('Update data:', req.body);

    // Validate content ID
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid content ID format' });
    }

    // Find the content first
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Validate and process update data
    const updateData = {};
    
    // Required fields
    if (req.body.title) updateData.title = req.body.title.trim();
    if (req.body.content) updateData.content = req.body.content.trim();
    if (req.body.author) updateData.author = req.body.author.trim();
    if (req.body.date) updateData.date = req.body.date;

    // Optional fields
    if (req.body.image !== undefined) {
      if (req.body.image) {
        try {
          new URL(req.body.image);
          updateData.image = req.body.image.trim();
        } catch (error) {
          return res.status(400).json({ 
            message: 'Invalid image URL',
            details: 'Please provide a valid image URL'
          });
        }
      } else {
        updateData.image = ''; // Allow clearing the image
      }
    }

    if (req.body.tags !== undefined) {
      updateData.tags = Array.isArray(req.body.tags) 
        ? req.body.tags 
        : req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    console.log('Processed update data:', updateData);

    // Update the content using findByIdAndUpdate
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    console.log('Content updated successfully:', updatedContent);
    res.json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to update content',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
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