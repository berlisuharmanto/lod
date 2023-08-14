const router = require('express').Router();

const authenticate = require('../Middleware/auth');
const adminMiddleware = require('../Middleware/admin');
const menuController = require('../Controllers/menu.controller');
const adminController = require('../Controllers/admin.controller');

router.post('/login', adminController.login)

//ONE TIME ONLY!!!
router.post('/make-super-admin', authenticate, adminController.makeSuperAdmin);

router.get('/menu', adminMiddleware, menuController.get);
router.get('/menu/:id', adminMiddleware, menuController.getById);
router.post('/menu', adminMiddleware, menuController.insert);
router.put('/menu/:id', adminMiddleware, menuController.update);
router.delete('/menu/:id', adminMiddleware, menuController.delete);

router.get('/users', adminMiddleware, adminController.getUsers);
router.get('/users/make-admin', adminMiddleware, adminController.makeAdmin);
// router.get('/users/me', adminMiddleware, adminController.getMe);
router.get('/users/:id', adminMiddleware, adminController.getById);
router.delete('/users/:id', adminMiddleware, adminController.delete);

module.exports = router;