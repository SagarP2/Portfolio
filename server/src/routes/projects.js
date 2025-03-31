const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const { auth, isAdmin } = require('../middleware/auth');

// Public routes
// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
});

// Protected routes (require authentication)
// Create a new project
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { title, description, image, technologies, githubLink, demoLink } = req.body;
    
    // Detailed validation
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!description) missingFields.push('description');
    if (!technologies) missingFields.push('technologies');
    if (!githubLink) missingFields.push('githubLink');
    if (!image) missingFields.push('image');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Required fields are missing', 
        missingFields,
        receivedData: req.body 
      });
    }

    // Validate image URL
    try {
      new URL(image);
    } catch (error) {
      return res.status(400).json({ 
        message: 'Invalid image URL',
        details: 'Please provide a valid image URL'
      });
    }

    // Parse technologies
    const techArray = Array.isArray(technologies) 
      ? technologies 
      : technologies.split(',').map(tech => tech.trim()).filter(tech => tech);

    // Create and save the project
    const project = new Project({
      title,
      description,
      image,
      technologies: techArray,
      githubLink,
      demoLink
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ 
      message: 'Error creating project', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

// Update a project
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { title, description, image, technologies, githubLink, demoLink } = req.body;
    
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

    // Parse technologies
    const techArray = Array.isArray(technologies) 
      ? technologies 
      : technologies.split(',').map(tech => tech.trim()).filter(tech => tech);

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description, 
        image, 
        technologies: techArray, 
        githubLink, 
        demoLink 
      },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete a project
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router; 