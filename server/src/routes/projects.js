const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
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
    const { 
      title, 
      subtitle,
      mainimage, 
      secondaryimage,
      publishedYear,
      shortDescription,
      officialWebsiteLink,
      gitHubLink,
      services,
      industries,
      technicalDescription,
      learningDescription,
      technologies, 
      demoLink 
    } = req.body;
    
    // Detailed validation
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!mainimage) missingFields.push('mainimage');
    if (!technologies) missingFields.push('technologies');
    if (!gitHubLink) missingFields.push('gitHubLink');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Required fields are missing', 
        missingFields,
        receivedData: req.body 
      });
    }

    // Validate image URLs
    try {
      new URL(mainimage);
      if (secondaryimage) {
        new URL(secondaryimage);
      }
    } catch (error) {
      return res.status(400).json({ 
        message: 'Invalid image URL',
        details: 'Please provide valid image URLs'
      });
    }

    // Parse arrays
    const techArray = Array.isArray(technologies) 
      ? technologies 
      : technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
    
    const servicesArray = Array.isArray(services)
      ? services
      : services ? services.split(',').map(service => service.trim()).filter(service => service) : [];
    
    const industriesArray = Array.isArray(industries)
      ? industries
      : industries ? industries.split(',').map(industry => industry.trim()).filter(industry => industry) : [];

    // Create and save the project
    const project = new Project({
      title,
      subtitle,
      mainimage,
      secondaryimage,
      publishedYear,
      shortDescription,
      officialWebsiteLink,
      gitHubLink,
      services: servicesArray,
      industries: industriesArray,
      technicalDescription,
      learningDescription,
      technologies: techArray,
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
    const { 
      title, 
      subtitle,
      mainimage, 
      secondaryimage,
      publishedYear,
      shortDescription,
      officialWebsiteLink,
      gitHubLink,
      services,
      industries,
      technicalDescription,
      learningDescription,
      technologies, 
      demoLink 
    } = req.body;
    
    // Validate image URLs if provided
    if (mainimage) {
      try {
        new URL(mainimage);
      } catch (error) {
        return res.status(400).json({ 
          message: 'Invalid mainimage URL',
          details: 'Please provide a valid image URL'
        });
      }
    }

    if (secondaryimage) {
      try {
        new URL(secondaryimage);
      } catch (error) {
        return res.status(400).json({ 
          message: 'Invalid secondaryimage URL',
          details: 'Please provide a valid image URL'
        });
      }
    }

    // Find the project
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Parse arrays if provided
    let techArray = project.technologies;
    if (technologies) {
      techArray = Array.isArray(technologies) 
        ? technologies 
        : technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
    }

    let servicesArray = project.services;
    if (services) {
      servicesArray = Array.isArray(services)
        ? services
        : services.split(',').map(service => service.trim()).filter(service => service);
    }

    let industriesArray = project.industries;
    if (industries) {
      industriesArray = Array.isArray(industries)
        ? industries
        : industries.split(',').map(industry => industry.trim()).filter(industry => industry);
    }

    // Update the project
    project.title = title || project.title;
    project.subtitle = subtitle !== undefined ? subtitle : project.subtitle;
    project.mainimage = mainimage || project.mainimage;
    project.secondaryimage = secondaryimage !== undefined ? secondaryimage : project.secondaryimage;
    project.publishedYear = publishedYear || project.publishedYear;
    project.shortDescription = shortDescription !== undefined ? shortDescription : project.shortDescription;
    project.officialWebsiteLink = officialWebsiteLink !== undefined ? officialWebsiteLink : project.officialWebsiteLink;
    project.gitHubLink = gitHubLink || project.gitHubLink;
    project.services = servicesArray;
    project.industries = industriesArray;
    project.technicalDescription = technicalDescription !== undefined ? technicalDescription : project.technicalDescription;
    project.learningDescription = learningDescription !== undefined ? learningDescription : project.learningDescription;
    project.technologies = techArray;
    project.demoLink = demoLink !== undefined ? demoLink : project.demoLink;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ 
      message: 'Error updating project', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

// Delete a project
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
});

module.exports = router; 