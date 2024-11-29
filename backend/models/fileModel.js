const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true // Ensures no duplicate filenames
  },
  uploader: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true // Every file must have an associated uploader
  },
  fileSize: { 
    type: Number, 
    required: true, // File size in bytes
    validate: {
      validator: Number.isInteger,
      message: 'File size must be an integer.'
    }
  },
  fileType: { 
    type: String, 
    required: true, // MIME type (e.g., 'application/pdf', 'image/png')
    enum: ['application/pdf', 'image/png', 'image/jpeg', 'text/plain', 'application/zip'] // Restricts to common types
  },
  access: { 
    type: String, 
    enum: ['public', 'private', 'restricted'], 
    default: 'private' // Access level for the file
  },
  sharedWith: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Users the file is shared with
  }],
  downloadCount: { 
    type: Number, 
    default: 0 // Tracks the number of times the file is downloaded
  },
  uploadedAt: { 
    type: Date, 
    default: Date.now // Timestamp for when the file was uploaded
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('File', FileSchema);
