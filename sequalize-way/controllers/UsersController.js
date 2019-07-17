import models from "./../models";

const findAll = async (req, res) => {
  const users = await models.User.findAll();
  res.send(users);
};

const update = async (req, res) => {
  var rowsAffected = await models.User.update(
    { firstName: req.body.firstName },
    { where: { id: req.params.id } }
  );
  res.sendStatus(204);
};

const getById = async (req, res) => {
  const existingUser = await models.User.findOne({
    where: { id: req.params.id }
  });
  res.status(200).send(existingUser);
};

const create = async (req, res) => {
  if (req.body.email === undefined) {
    const errors = {
      errors: { message: "Email is required.", field: "Email" }
    };
    res.status(400);
    return res.send(errors);
  }
  const newUser = await models.User.create(req.body);
  res.status(201);
  res.send(newUser);
};

const deleteUser = async (req, res) => {
  await models.User.destroy({
    where: { id: req.params.id }
  });
  res.sendStatus(204);
};

module.exports = {
  findAll,
  update,
  getById,
  create,
  deleteUser
};
