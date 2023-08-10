const router = require('express').Router();

const authRoute = require('../api/routes/auth.route');
const menuRoute = require('../api/routes/menu.route');

router.use('/auth', authRoute);
router.use('/menu', menuRoute);

module.exports = router;