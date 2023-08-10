const router = require('express').Router();

const cartController = require('../Controllers/cart.controller');
const authMiddleware = require('../Middleware/auth');

router.get('/', authMiddleware, cartController.get);
router.get('/:id', authMiddleware, cartController.getById);
router.post('/', authMiddleware, cartController.insert);
router.put('/:id', authMiddleware, cartController.update);
router.delete('/:id', authMiddleware, cartController.delete);
router.post('/checkout', authMiddleware, cartController.checkout);

module.exports = router;