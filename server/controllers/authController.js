const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const TOKEN_EXPIRY = '24h';

/**
 * User Registration Controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} User data and JWT token
 */
exports.register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role = 'user' } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role,
      productivityPreferences: {
        workHoursStart: '09:00',
        workHoursEnd: '17:00',
        focusSessionDuration: 25, // in minutes
        breakDuration: 5, // in minutes
        preferredWorkDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      createdAt: Date.now()
    });

    // Save user to database
    await user.save();

    // Create payload for JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };

    // Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    // Return user info (excluding password) and token
    const userToReturn = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      productivityPreferences: user.productivityPreferences,
      createdAt: user.createdAt
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userToReturn,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * User Login Controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} User data and JWT token
 */
exports.login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create payload for JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };

    // Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    // Return user info (excluding password) and token
    const userToReturn = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      productivityPreferences: user.productivityPreferences,
      createdAt: user.createdAt,
      lastLogin: Date.now()
    };

    // Update last login timestamp
    await User.findByIdAndUpdate(user.id, { lastLogin: Date.now() });

    res.json({
      message: 'Login successful',
      user: userToReturn,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * Get Current User Controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} Current user data
 */
exports.getCurrentUser = async (req, res) => {
  try {
    // User is retrieved from auth middleware and attached to req
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
};

/**
 * Update User Profile Controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} Updated user data
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, productivityPreferences } = req.body;
    
    // Create update object with only allowed fields
    const updateData = {};
    if (name) updateData.name = name;
    if (productivityPreferences) updateData.productivityPreferences = productivityPreferences;
    
    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

/**
 * Change Password Controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} Success message
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get user with password
    const user = await User.findById(req.user.id);
    
    // Check if current password is correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error while changing password' });
  }
};