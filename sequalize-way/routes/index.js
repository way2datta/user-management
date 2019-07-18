const express = require("express");
const router = express.Router();
const userRouter = require(__dirname+"/users");

router.use('/users', userRouter);

module.exports = router;
