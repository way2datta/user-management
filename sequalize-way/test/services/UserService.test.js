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
    var userService = UserService.createInstance(fakeUserModel);
    userService.findAll().then(users => {
      expect(users).to.eql(usersFromApi);
      done();
    });
  });

  it("should get users by id", done => {
    // Arrange
    var fakeUserModel = {
      findOne: function () {
        return Promise.resolve();
      }
    };
    var findOneSpy = sinon.spy(fakeUserModel, 'findOne')
    var userService = UserService.createInstance(fakeUserModel);

    // Act
    userService.getById();

    // Assert
    expect(findOneSpy.callCount).to.be.equal(1);

    findOneSpy.restore();
    done();
  });

  it("should create user", done => {
    // Arrange
    var fakeUserModel = {
      create: function () {
        return Promise.resolve();
      }
    };
    var createSpy = sinon.spy(fakeUserModel, 'create')
    var userService = UserService.createInstance(fakeUserModel);

    // Act
    userService.create();

    // Assert
    expect(createSpy.callCount).to.be.equal(1);
    createSpy.restore();
    done();
  });

  it("should update user", done => {
    // Arrange
    var fakeUserModel = {
      update: function () {
        return Promise.resolve();
      },
      findOne: function () {
        return Promise.resolve();
      }
    };
    var updateSpy = sinon.spy(fakeUserModel, 'update')
    var userService = UserService.createInstance(fakeUserModel);

    // Act
    userService.update().then(() => {
      // Assert
      expect(updateSpy.callCount).to.be.equal(1);
      updateSpy.restore();
      done();
    });
  });

  it("should destroy user", done => {
    // Arrange
    var fakeUserModel = {
      destroy: function () {
        return Promise.resolve();
      },
      findOne: function () {
        return Promise.resolve();
      }
    };
    var destroySpy = sinon.spy(fakeUserModel, 'destroy')
    var userService = UserService.createInstance(fakeUserModel);

    // Act
    userService.destroy().then(() => {
      // Assert
      expect(destroySpy.callCount).to.be.equal(1);
      destroySpy.restore();
      done();
    });
  });
});
