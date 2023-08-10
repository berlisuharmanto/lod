const router = require('express').Router();

const authRoute = require('../api/routes/auth.route');

router.use('/auth', authRoute);

module.exports = router;