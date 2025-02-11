const express = require('express');
const userController = require('../controllers/user.controller');

const { checkAuthMiddleware } = require('../middleware/checkAuth.middleware');

const router = express.Router();

router.post('/signup', userController.signUpController);
router.post('/signin', userController.signInController);
router.get('/profile', checkAuthMiddleware, userController.profileController);

module.exports = router;