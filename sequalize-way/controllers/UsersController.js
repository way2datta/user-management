import models from "./../models";
import HttpStatus from "http-status-codes";
import validate from "./../validators/UserValidator";

const findAll = async (req, res) => {
  const users = await models.User.findAll();
  res.status(HttpStatus.OK).send(users);
};

const update = async (req, res) => {
  var rowsAffected = await models.User.update(req.body, {
    where: { id: req.params.id }
  });
  res.sendStatus(HttpStatus.NO_CONTENT);
};

const getById = async (req, res) => {
  const existingUser = await models.User.findOne({
    where: { id: req.params.id }
  });
  res.status(HttpStatus.OK).send(existingUser);
};

const create = async (req, res) => {
  const validationErrors = validate(req.body);
  if (validationErrors) {
    return res.status(HttpStatus.BAD_REQUEST).send(validationErrors);
  }
  const newUser = await models.User.create(req.body);
  res.status(HttpStatus.CREATED);
  res.send(newUser);
};

const deleteUser = async (req, res) => {
  await models.User.destroy({
    where: { id: req.params.id }
  });
  res.sendStatus(HttpStatus.NO_CONTENT);
};

module.exports = {
  findAll,
  update,
  getById,
  create,
  deleteUser
};
