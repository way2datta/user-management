const express = require("express");
const router = express.Router();
const models = require(__dirname + "/../models");
const userRouter = require(__dirname+"/users");


router.use('/users', userRouter);

module.exports = router;
