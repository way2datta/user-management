const express = require("express");
const router = express.Router();
const models = require(__dirname + "/../models");
const userController = require(__dirname + "/../controllers/UsersController")

router.post("/", userController.update);
router.get("/", userController.findAll);
router.get("/:id", userController.getById);

router.delete("/:id", (req, res) => {
  models.User.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.sendStatus(204);
  });
});

router.put("/:id", (req, res) => {
  models.User.update(
    { firstName: req.body.firstName },
    { where: { id: req.params.id } }
  ).then(() => {
    res.sendStatus(204);
  });
});

module.exports = router;
