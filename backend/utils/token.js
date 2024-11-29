const jwt = require('jsonwebtoken');

// Generate a new JWT token
const generateToken = (user) => {
  try {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error('Failed to generate token.');
  }
};

// Validate a token and return decoded payload
const validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Error validating token:', error.message);
    throw new Error('Invalid or expired token.');
  }
};

// Decode a token without verifying
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('Error decoding token:', error.message);
    throw new Error('Failed to decode token.');
  }
};

module.exports = { generateToken, validateToken, decodeToken };
