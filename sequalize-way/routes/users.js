const express = require("express");
const router = express.Router();
const models = require(__dirname + "/../models");
const userController = require(__dirname + "/../controllers/UsersController")

router.get("/", userController.findAll);
router.put("/:id", userController.update);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.delete("/:id", userController.deleteUser);

module.exports = router;
