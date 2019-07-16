const models = require(__dirname + "/../models");

const findAll = (req, res) => {
  models.User.findAll().then(users => {
    res.send(users);
  });
};

const update = (req, res) => {
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
};

const getById = (req, res) => {
  models.User.findOne({ where: { id: req.params.id } }).then(user => {
    res.status(200).send(user);
  });
};

module.exports = {
  findAll,
  update,
  getById
};
