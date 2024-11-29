const express = require('express');
const { login, register, toggleUserStatus } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Public Routes
// Route for user login
router.post('/login', login);

// Route for user registration
router.post('/register', register);

// Protected Admin Routes
// Route to activate or deactivate a user account
router.put('/toggle-status', authMiddleware, roleMiddleware(['Admin']), toggleUserStatus);

module.exports = router;
