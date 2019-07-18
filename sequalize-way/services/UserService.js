import models from "../models";

export default class UserService {
  create = async (user) => {
    const newUser = await models.User.create(user);
    return newUser;
  };

  findAll = async () => {
    return await models.User.findAll();
  };

  update = async (newValues, id) => {
    await models.User.update(newValues, {
      where: { id: id }
    });
  };

  getById = async (id) => {
    const existingUser = await models.User.findOne({
      where: { id: id }
    });
    return existingUser;
  };

  destroy = async (id) => {
    await models.User.destroy({
      where: { id: id }
    });
  };
}
