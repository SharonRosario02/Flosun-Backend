const express = require('express');
const {
    signUpController,
  signInController,
  getAllUsersController,
  updateUserController,
  deleteAllUsersController,
  deleteSingleUserController,
  generateResetPasswordOTP,
  verifyResetPasswordOTP,
  resetPasswordController,
} = require('../Controllers/userController.js');

const router = express.Router();

// User sign up
router.post('/signup', signUpController);

// User sign-in
router.post('/signin', signInController);

// Get all users
router.get('/', getAllUsersController);

// Update a user by ID
router.put('/:id', updateUserController);

// Delete all users
router.delete('/', deleteAllUsersController);

// Delete a single user by ID
router.delete('/:id', deleteSingleUserController);

// Generate reset password OTP
router.post('/reset-password/generate-otp', generateResetPasswordOTP);

// Verify reset password OTP
router.post('/reset-password/verify-otp', verifyResetPasswordOTP);

// Reset user password
router.post('/reset-password', resetPasswordController);

module.exports = router;