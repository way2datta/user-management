import HttpStatus from "http-status-codes";
import UserValidator from "../validators/validateUser";
import UserService from "./../services/UserService";

export default class UsersController {
  constructor(service, validator) {
    this.service = service || new UserService();
    this.validator = validator || new UserValidator();
  }
  create = async (req, res) => {
    const validationErrors = this.validator.validate(req.body);
    if (validationErrors) {
      res.status(HttpStatus.BAD_REQUEST);
      return res.send(validationErrors);
    }

    const newUser = await this.service.create(req.body);
    res.status(HttpStatus.CREATED);
    res.send(newUser);
  };

  findAll = async (req, res) => {
    const users = await this.service.findAll();
    res.status(HttpStatus.OK);
    res.send(users);
  };

  update = async (req, res, next) => {
    const validationErrors = validateUser(req.body);
    if (validationErrors) {
      return res.status(HttpStatus.BAD_REQUEST).send(validationErrors);
    }

    const existingUser = await this.service.getById(req.params.id);
    if (!existingUser) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }

    await this.service.update(req.body, req.params.id);
    res.sendStatus(HttpStatus.NO_CONTENT);
  };

  getById = async (req, res) => {
    const existingUser = await this.service.getById(req.params.id);
    if (!existingUser) {
      res.status(HttpStatus.NOT_FOUND);
      return res.send();
    }
    res.status(HttpStatus.OK);
    res.send(existingUser);
  };

  destroy = async (req, res) => {
    const existingUser = await this.service.getById(req.params.id);
    if (!existingUser) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }
    await this.service.destroy(req.params.id);
    res.sendStatus(HttpStatus.NO_CONTENT);
  };
}
