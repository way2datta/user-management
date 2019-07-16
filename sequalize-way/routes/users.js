const express = require('express');
const router = express.Router();
const userController = require(__dirname+'/../controllers/UserController');

router.use('/user', userController);


module.exports = router;