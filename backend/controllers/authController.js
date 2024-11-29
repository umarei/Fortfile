const User = require('../models/userModel');
const { generateToken } = require('../utils/token');
const bcrypt = require('bcrypt');

// User Registration
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check for required fields
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check for existing user by username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Check for existing user by email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Failed to register user.', error: error.message });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Invalid username or password.' });
    }

    // Check if the user account is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated. Please contact support.' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate a JWT token
    const token = generateToken(user);
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Failed to login.', error: error.message });
  }
};

// Activate or Deactivate User
const toggleUserStatus = async (req, res) => {
  try {
    const { userId, isActive } = req.body;

    // Validate input
    if (!userId || typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'Invalid input. User ID and isActive status are required.' });
    }

    // Update user status
    const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: `User ${isActive ? 'activated' : 'deactivated'} successfully.`, user });
  } catch (error) {
    console.error('Toggle User Status Error:', error.message);
    res.status(500).json({ message: 'Failed to update user status.', error: error.message });
  }
};

module.exports = { register, login, toggleUserStatus };
