const express = require('express');
const registerRoute = require('./authentication');
const router = express.Router();




router.use('/authentication', registerRoute);
module.exports = router;
