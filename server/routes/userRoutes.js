const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', auth, userController.getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  auth,
  [
    check('name', 'Name cannot be empty if provided').optional().not().isEmpty(),
    check('productivityPreferences', 'Productivity preferences must be an object if provided')
      .optional()
      .isObject()
  ],
  userController.updateUserProfile
);

/**
 * @route   PUT /api/users/preferences
 * @desc    Update user productivity preferences
 * @access  Private
 */
router.put(
  '/preferences',
  auth,
  [
    check('productivityPreferences', 'Productivity preferences must be provided')
      .isObject(),
    check('productivityPreferences.workHoursStart', 'Work hours start time must be in HH:MM format')
      .optional()
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('productivityPreferences.workHoursEnd', 'Work hours end time must be in HH:MM format')
      .optional()
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('productivityPreferences.focusSessionDuration', 'Focus session duration must be a number')
      .optional()
      .isNumeric(),
    check('productivityPreferences.breakDuration', 'Break duration must be a number')
      .optional()
      .isNumeric()
  ],
  userController.updateProductivityPreferences
);

/**
 * @route   GET /api/users/stats
 * @desc    Get user productivity statistics
 * @access  Private
 */
router.get('/stats', auth, userController.getUserStats);

/**
 * @route   PUT /api/users/password
 * @desc    Change user password
 * @access  Private
 */
router.put(
  '/password',
  auth,
  [
    check('currentPassword', 'Current password is required').not().isEmpty(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
  ],
  userController.changePassword
);

/**
 * @route   GET /api/users/teams
 * @desc    Get user teams
 * @access  Private
 */
router.get('/teams', auth, userController.getUserTeams);

/**
 * @route   DELETE /api/users/account
 * @desc    Delete user account
 * @access  Private
 */
router.delete(
  '/account',
  auth,
  [
    check('password', 'Password is required for account deletion').not().isEmpty()
  ],
  userController.deleteAccount
);

module.exports = router;