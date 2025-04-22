const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

/**
 * Get current user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} User profile data
 */
exports.getUserProfile = async (req, res) => {
  try {
    // Find user by ID (from auth middleware) and exclude password
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error in getUserProfile:', err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Update user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated user data
 */
exports.updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, productivityPreferences } = req.body;
  
  // Build user profile object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (productivityPreferences) userFields.productivityPreferences = productivityPreferences;

  try {
    // Find user by ID and update
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true, select: '-password' }
    );

    res.json(user);
  } catch (err) {
    console.error('Error in updateUserProfile:', err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Update user productivity preferences
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated user productivity preferences
 */
exports.updateProductivityPreferences = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productivityPreferences } = req.body;

  try {
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user productivity preferences
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { productivityPreferences } },
      { new: true, select: 'productivityPreferences' }
    );

    res.json(user.productivityPreferences);
  } catch (err) {
    console.error('Error in updateProductivityPreferences:', err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get user productivity statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} User productivity stats
 */
exports.getUserStats = async (req, res) => {
  try {
    // This would typically query task data and aggregate statistics
    // For now, return placeholder data
    const stats = {
      tasksCompleted: 0,
      tasksInProgress: 0,
      focusTimeToday: 0,
      averageTaskCompletion: 0,
      productivityScore: 0,
      weeklyProgress: [0, 0, 0, 0, 0, 0, 0] // Days of the week
    };

    res.json(stats);
  } catch (err) {
    console.error('Error in getUserStats:', err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Change user password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save user with new password
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error('Error in changePassword:', err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get user teams
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} User teams
 */
exports.getUserTeams = async (req, res) => {
  try {
    // This would typically query team data
    // For now, return empty array or placeholder
    const teams = [];

    res.json(teams);
  } catch (err) {
    console.error('Error in getUserTeams:', err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Delete user account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
exports.deleteAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;

  try {
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Password is incorrect' });
    }

    // Delete user
    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: 'User account deleted successfully' });
  } catch (err) {
    console.error('Error in deleteAccount:', err.message);
    res.status(500).send('Server error');
  }
};