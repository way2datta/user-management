import { expect } from "chai";
import sinon from "sinon";
import UserService from "../../services/UserService";

describe("UserService", () => {
  it("should find all users", done => {
    var usersFromApi = [{ firstName: "John" }];
    var fakeUserModel = {
      findAll: function () {
        return Promise.resolve(usersFromApi);
      }
    };
    var userService = UserService.create(fakeUserModel);
    userService.findAll().then(users => {
      console.log(users, usersFromApi);
      expect(users).to.eql(usersFromApi);
      done();
    });
  });

  it.only("should get users by id", done => {
    var usersFromApi = [
      { id: 1, firstName: "John" },
      { id: 2, firstName: "Jane" }
    ];
    var fakeUserModel = {
      findOne: function () {
        return Promise.resolve(usersFromApi[0]);
      }
    };
    var userService = UserService.create(fakeUserModel);
    userService.getById().then(users => {
      expect(users).to.eql(usersFromApi[0]);
      done();
    });
  });
});
