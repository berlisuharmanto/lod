const router = require('express').Router();

const authRoute = require('../api/routes/auth.route');
const menuRoute = require('../api/routes/menu.route');
const adminRoute = require('../api/routes/admin.route');
const cartRoute = require('../api/routes/cart.route');

router.use('/auth', authRoute);
router.use('/menu', menuRoute);
router.use('/cart', cartRoute);
router.use('/admin', adminRoute);

module.exports = router;