const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile.controller')
const { checkAuthMiddleware } = require('../middleware/checkAuth.middleware')

router.put('/update', checkAuthMiddleware, profileController.updateProfile)

module.exports = router