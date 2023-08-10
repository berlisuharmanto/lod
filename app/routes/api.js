const router = require('express').Router();

const authRoute = require('../api/routes/auth.route');
const menuRoute = require('../api/routes/menu.route');
const adminRoute = require('../api/routes/admin.route');

router.use('/auth', authRoute);
router.use('/menu', menuRoute);
router.use('/admin', adminRoute);

module.exports = router;