// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware to protect routes
 * Verifies JWT and attaches the user object to req
 */
const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // For debugging: log the received token (first few characters)
    console.log('Token received (first 15 chars):', token ? token.substring(0, 15) + '...' : 'none');

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token structure:', Object.keys(decoded));

    // Support both formats: decoded.id or decoded.user.id
    const userId = decoded.id || (decoded.user && decoded.user.id);
    
    if (!userId) {
      console.log('Invalid token structure - no user ID found');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Find user by ID from decoded token
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      console.log('User not found for ID:', userId);
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

/**
 * Admin authorization middleware
 * Checks if user role is 'admin'
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
};

module.exports = auth;
module.exports.admin = admin;