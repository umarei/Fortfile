const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, // Removes unnecessary whitespace
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Validates email format
  },
  password: { 
    type: String, 
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
  },
  role: { 
    type: String, 
    enum: ['Admin', 'Uploader', 'Viewer', 'Free', 'Basic', 'Premium'], 
    default: 'Viewer', // Default role
    required: true
  },
  isActive: { 
    type: Boolean, 
    default: true // Indicates if the user account is active
  },
  lastLogin: { 
    type: Date // Tracks the user's last login time
  },
  profile: { 
    fullName: { 
      type: String, 
      trim: true 
    },
    avatar: { 
      type: String, // URL to the user's avatar/profile picture
      default: ''
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Account creation timestamp
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Password Hashing Middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
