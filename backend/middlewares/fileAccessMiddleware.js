const File = require('../models/fileModel');

const fileAccessMiddleware = async (req, res, next) => {
  try {
    const fileId = req.params.fileId; // Extract file ID from request params
    const userId = req.user.id; // Extract user ID from authenticated user

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    // Check access permissions
    if (
      file.access === 'private' &&
      file.uploader.toString() !== userId &&
      !file.sharedWith.includes(userId)
    ) {
      return res.status(403).json({ message: 'You do not have access to this file.' });
    }

    // Attach the file to the request for further processing
    req.file = file;
    next();
  } catch (error) {
    console.error('File Access Middleware Error:', error.message);
    res.status(500).json({ message: 'Failed to verify file access.', error: error.message });
  }
};

module.exports = fileAccessMiddleware;
