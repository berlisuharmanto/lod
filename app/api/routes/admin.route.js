const router = require('express').Router();

const adminMiddleware = require('../Middleware/admin');
const menuController = require('../Controllers/menu.controller');
const adminController = require('../Controllers/admin.controller');

router.post('/login', adminController.login)
router.post('/make-super-admin', adminController.makeSuperAdmin);

router.get('/', adminMiddleware, menuController.get);
router.get('/:id', adminMiddleware, menuController.getById);
router.post('/', adminMiddleware, menuController.insert);
router.put('/:id', adminMiddleware, menuController.update);
router.delete('/:id', adminMiddleware, menuController.delete);

router.get('/users', adminMiddleware, adminController.getUsers);
router.get('/users/make-admin', adminMiddleware, adminController.makeAdmin);
router.get('/users/me', adminMiddleware, adminController.getMe);
router.get('/users/:id', adminMiddleware, adminController.getById);
router.delete('/users/:id', adminMiddleware, adminController.delete);

module.exports = router;