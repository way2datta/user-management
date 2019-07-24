import { User } from "../models";

export default class UserService {
  constructor(userModel) {
    this.UserModel = userModel || User;
  }

  static createInstance(userModel) {
    return new UserService(userModel);
  }

  create = async user => {
    const newUser = await this.UserModel.create(user);
    return newUser;
  };

  findAll = async () => {
    return await this.UserModel.findAll();
  };

  update = async (newValues, id) => {
    await this.getById(id);
    await this.UserModel.update(newValues, { where: { id: id } });
  };

  getById = async id => {
    const existingUser = await this.UserModel.findOne({
      where: { id: id }
    });
    return existingUser;
  };

  destroy = async id => {
    await this.getById(id);
    await this.UserModel.destroy({
      where: { id: id }
    });
  };
}
