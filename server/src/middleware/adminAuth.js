const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to verify if the user is an admin
 * This middleware should be used after the auth middleware
 */
const adminAuth = async (req, res, next) => {
  try {
    // Check if user exists in request (added by auth middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Check if user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // User is authenticated and is an admin, proceed
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ message: 'Server error during admin authentication' });
  }
};

module.exports = adminAuth; 