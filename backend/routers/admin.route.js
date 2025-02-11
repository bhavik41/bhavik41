const express = require('express')
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const { checkAuthMiddleware } = require('../middleware/checkAuth.middleware');

router.get('/allusers', checkAuthMiddleware, adminController.getAllUsers)

module.exports = router;