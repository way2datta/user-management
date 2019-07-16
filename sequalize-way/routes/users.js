const express = require("express");
const router = express.Router();
const models = require(__dirname + "/../models");
const userController = require(__dirname + "/../controllers/user")

router.post("/", (req, res) => {
  if (req.body.email === undefined) {
    const errors = {
      errors: { message: "Email is required.", field: "Email" }
    };
    res.status(400);
    return res.send(errors);
  }
  models.User.create(req.body).then(user => {
    res.status(201);
    res.send(user);
  });
});

router.get("/", userController.findAllUsers);


router.get("/:id", (req, res) => {
  models.User.findOne({ where: { id: req.params.id } }).then(user => {
    res.status(200).send(user);
  });
});

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
