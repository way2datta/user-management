import models from "./../models";
import HttpStatus from "http-status-codes";
import validateUser from "../validators/validateUser";

export default class UsersController {
  create = async (req, res) => {
    const validationErrors = validateUser(req.body);
    if (validationErrors) {
      return res.status(HttpStatus.BAD_REQUEST).send(validationErrors);
    }
    const newUser = await models.User.create(req.body);
    res.status(HttpStatus.CREATED);
    res.send(newUser);
  };

  findAll = async (req, res) => {
    const users = await models.User.findAll();
    res.status(HttpStatus.OK).send(users);                                                                                                                                                                                                                  
  };

  update = async (req, res) => {
    const validationErrors = validateUser(req.body);
    if (validationErrors) {
      return res.status(HttpStatus.BAD_REQUEST).send(validationErrors);
    }
    await models.User.update(req.body, {
      where: { id: req.params.id }
    });
    res.sendStatus(HttpStatus.NO_CONTENT);
  };

  getById = async (req, res) => {
    const existingUser = await models.User.findOne({
      where: { id: req.params.id }
    });
    res.status(HttpStatus.OK).send(existingUser);
  };

  deleteUser = async (req, res) => {
    await models.User.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(HttpStatus.NO_CONTENT);
  };
}
