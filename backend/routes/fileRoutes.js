const express = require('express');
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');
const fileAccessMiddleware = require('../middlewares/fileAccessMiddleware');

const router = express.Router();

// Routes
router.post('/upload', authMiddleware, uploadFile);
router.get('/list', authMiddleware, listFiles);
router.get('/download/:fileId', authMiddleware, fileAccessMiddleware, downloadFile);

module.exports = router;
