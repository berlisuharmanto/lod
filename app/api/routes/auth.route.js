const router = require('express').Router();

const authController = require('../Controllers/auth.controller');
const authMiddleware = require('../Middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;