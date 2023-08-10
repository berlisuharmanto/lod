const router = require('express').Router();

const authMiddleware = require('../Middleware/auth');
const menuController = require('../Controllers/menu.controller');

router.get('/', authMiddleware, menuController.get);
router.get('/:id', authMiddleware, menuController.getById);

module.exports = router;