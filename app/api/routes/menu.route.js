const router = require('express').Router();

const authMiddleware = require('../Middleware/auth');
const menuController = require('../Controllers/menu.controller');

router.get('/', authMiddleware, menuController.get);
router.get('/:id', authMiddleware, menuController.getById);
router.post('/', authMiddleware, menuController.insert);
router.put('/:id', authMiddleware, menuController.update);
router.delete('/:id', authMiddleware, menuController.delete);

module.exports = router;