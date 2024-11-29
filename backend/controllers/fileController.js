const File = require('../models/fileModel');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: './backend/uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single('file');

// Upload File
const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: 'File upload failed.', error: err.message });

    try {
      const role = req.user.role;
      const fileSize = req.file.size;

      // Check role-based size limits
      const sizeLimits = {
        free: 300 * 1024 * 1024, // 300 MB
        basic: 1024 * 1024 * 1024, // 1 GB
        premium: Infinity,
      };

      if (fileSize > sizeLimits[role]) {
        return res.status(403).json({
          message: `File size exceeds your role limit of ${sizeLimits[role] / (1024 * 1024)} MB.`,
        });
      }

      // Create file entry in DB
      const file = new File({
        filename: req.file.filename,
        uploader: req.user.id,
        fileSize,
        fileType: req.file.mimetype,
        access: 'private', // Default to private
      });

      await file.save();

      res.status(201).json({ message: 'File uploaded successfully.', file });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save file metadata.', error: error.message });
    }
  });
};

// List Files (with access control)
const listFiles = async (req, res) => {
  try {
    const files = await File.find({
      $or: [{ uploader: req.user.id }, { sharedWith: req.user.id }, { access: 'public' }],
    }).populate('uploader', 'username');

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch files.', error: error.message });
  }
};

// Download File (Access Control)
const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    if (!file) return res.status(404).json({ message: 'File not found.' });

    // Check access
    if (
      file.access === 'private' &&
      file.uploader.toString() !== req.user.id &&
      !file.sharedWith.includes(req.user.id)
    ) {
      return res.status(403).json({ message: 'You do not have access to this file.' });
    }

    // Increment download count
    file.downloadCount += 1;
    await file.save();

    res.download(path.join(__dirname, `../uploads/${file.filename}`));
  } catch (error) {
    res.status(500).json({ message: 'Failed to download file.', error: error.message });
  }
};

module.exports = { uploadFile, listFiles, downloadFile };
