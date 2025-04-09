const express = require('express');
const router = express.Router();
const About = require('../models/About');
const { auth, isAdmin } = require('../middleware/auth');

// @route   GET /api/about
// @desc    Get about content
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/about - Fetching about content');
    let about = await About.findOne();
    
    // If no about content exists, create default content
    if (!about) {
      console.log('No about content found, creating default content');
      about = new About({
        title: 'About Us',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        paragraphs: [
          'At Techveda, we believe in the power of technology to transform businesses and enhance lives. Founded in 2020, our journey began with a simple mission: to create digital solutions that make a difference.',
          'We\'re a team of passionate designers, developers, and strategists who thrive on solving complex problems through innovative technology. With expertise spanning web development, mobile applications, UI/UX design, and digital marketing, we bring a comprehensive approach to every project.',
          'What sets us apart is our commitment to understanding your unique needs. We don\'t just build products; we craft experiences that align with your business goals and resonate with your audience. Our collaborative process ensures that your vision is at the heart of everything we create.',
          'From startups to established enterprises, we\'ve helped clients across industries elevate their digital presence and achieve measurable results. We\'re excited about the possibilities that technology brings and look forward to helping you navigate the ever-evolving digital landscape.'
        ],
        highlights: [
          { text: 'Techveda', paragraphIndex: 0 }
        ]
      });
      
      try {
        await about.save();
        console.log('Default about content created successfully');
      } catch (saveError) {
        console.error('Error saving default about content:', saveError);
        return res.status(500).json({ 
          message: 'Error creating default about content',
          error: process.env.NODE_ENV === 'development' ? saveError.message : undefined
        });
      }
    }
    
    console.log('Sending about content:', about);
    res.json(about);
  } catch (err) {
    console.error('Error in GET /api/about:', err);
    res.status(500).json({ 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// @route   PUT /api/about
// @desc    Update about content
// @access  Admin
router.put('/', [auth, isAdmin], async (req, res) => {
  try {
    console.log('PUT /api/about - Updating about content');
    console.log('Request body:', req.body);
    
    const { title, image, paragraphs, highlights } = req.body;
    
    // Validate required fields
    if (!title || !image || !paragraphs || !Array.isArray(paragraphs) || paragraphs.length === 0) {
      console.log('Validation failed:', { title, image, paragraphs });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Find the existing about document
    let about = await About.findOne();
    
    if (!about) {
      console.log('No about document found, creating new one');
      about = new About();
    }
    
    // Update the fields
    about.title = title;
    about.image = image;
    about.paragraphs = paragraphs;
    about.highlights = highlights || [];
    about.updatedAt = Date.now();
    
    try {
      await about.save();
      console.log('About content updated successfully');
      res.json(about);
    } catch (saveError) {
      console.error('Error saving about content:', saveError);
      res.status(500).json({ 
        message: 'Error saving about content',
        error: process.env.NODE_ENV === 'development' ? saveError.message : undefined
      });
    }
  } catch (err) {
    console.error('Error in PUT /api/about:', err);
    if (err.message === 'Only one about document can exist') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router; 