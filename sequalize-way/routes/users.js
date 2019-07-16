const express = require("express");
const router = express.Router();
const models = require(__dirname + "/../models");
const userController = require(__dirname + "/../controllers/user")

router.post("/", );

router.get("/", userController.findAllUsers);
router.post("/", userController.createNewUser);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);
router.get("/:id", userController.getUserById);






module.exports = router;
