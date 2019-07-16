const express = require("express");
const router = express.Router();
const models = require(__dirname + "/../models");

router.post("/users", (req, res) => {
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
router.get("/users", (req, res) => {
  models.User.findAll().then(users => {
    res.send(users);
  });
});

router.get("/users/:id", (req, res) => {
  models.User.findOne({ where: { id: req.params.id } }).then(user => {
    res.status(200).send(user);
  });
});

router.delete("/users/:id", (req, res) => {
  models.User.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.sendStatus(204);
  });
});

router.put("/users/:id", (req, res) => {
  if (typeof +req.params.id === "number") {
    return res.sendStatus(400);
  }
  models.User.update(
    { firstName: req.body.firstName },
    { where: { id: req.params.id } }
  ).then(() => {
    res.sendStatus(204);
  });
});

module.exports = router;
