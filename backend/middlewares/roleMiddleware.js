const Role = require('../models/roleModel');

const roleMiddleware = (requiredRoles) => async (req, res, next) => {
  try {
    // Check if the user's role is valid
    const userRole = req.user.role;

    if (!userRole) {
      return res.status(403).json({ message: 'User role not found. Access denied.' });
    }

    // Fetch the role details from the database
    const role = await Role.findOne({ name: userRole });
    if (!role) {
      return res.status(403).json({ message: `Role '${userRole}' does not exist. Access denied.` });
    }

    // Check if the user has the required role
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  } catch (error) {
    console.error('Role Middleware Error:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = roleMiddleware;
