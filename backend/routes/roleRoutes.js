const express = require('express');
const { addRole, listRoles } = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protected Admin Routes
router.post('/add', authMiddleware, roleMiddleware(['Admin']), addRole);
router.get('/list', authMiddleware, roleMiddleware(['Admin']), listRoles);

module.exports = router;
