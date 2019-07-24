const express = require("express");
const router = express.Router();
import UsersController from "./../controllers/UsersController";

const userController = new UsersController();

router.get("/", userController.findAll);
router.put("/:id", userController.update);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.delete("/:id", userController.destroy);

module.exports = router;
