const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true // Removes leading/trailing whitespace
  },
  description: { 
    type: String, 
    default: '' // Brief description of the role's purpose
  },
  permissions: [{ 
    type: String, 
    required: true // List of actions the role is allowed to perform
  }],
  isDefault: { 
    type: Boolean, 
    default: false // Marks if the role is a default system role (e.g., 'Viewer')
  }
}, {
  timestamps: true // Adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Role', RoleSchema);
