const Role = require('../models/roleModel');

// Add Role
const addRole = async (req, res) => {
  try {
    const { name, permissions, description } = req.body;

    // Check for existing role
    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ message: 'Role already exists.' });

    // Create new role
    const role = new Role({ name, permissions, description });
    await role.save();

    res.status(201).json({ message: 'Role added successfully.', role });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add role.', error: error.message });
  }
};

// List All Roles
const listRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roles.', error: error.message });
  }
};

module.exports = { addRole, listRoles };
