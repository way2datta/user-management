import { expect } from "chai";
import UsersController from "./../../controllers/UsersController";
import sinon from "sinon";

describe.only("UsersController", () => {
  const req = {};
  let res = {};

  beforeEach(function () {
    res = {
      sendCalledWith: '',
      statusCalledWith: '',
      status: function (arg) {
        this.statusCalledWith = arg;
      },
      send: function (arg) {
        this.sendCalledWith = arg;
      }
    };
  });

  describe("findAll", () => {
    it("should return status ok", done => {
      const service = {
        findAll: () => { }
      };
      const controller = new UsersController(service);
      controller.findAll(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(200);
        done();
      });
    });

    it("should get all users", done => {
      const users = [{ firsName: "John" }, { firsName: "Jane" }]
      const service = {
        findAll: () => users
      };
      const controller = new UsersController(service);
      controller.findAll(req, res).then(() => {
        expect(res.sendCalledWith).to.be.equal(users);
        done();
      });
    });

    it("should call service -> findAll", done => {
      const service = {
        findAll: () => { }
      };
      var spy = sinon.spy(service, "findAll");
      const controller = new UsersController(service);
      controller.findAll(req, res).then(() => {
        expect(spy.calledOnce).to.be.ok;
        done();
      });
    });
  });

  describe("GetById", () => {
    it("should return status ok", done => {
      const service = {
        getById() {
          return {}
        }
      };
      const controller = new UsersController(service);
      const req = { params: { id: 1 } };
      controller.getById(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(200);
        done();
      });
    });
    it("should return status not found", done => {
      const service = {
        getById() {
          return undefined;
        }
      };
      const controller = new UsersController(service);
      const req = { params: { id: 1 } };
      controller.getById(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(404);
        done();
      });
    });

    it("should return user by id", done => {
      const user = { firsName: 'John', age: 30 }
      const service = {
        getById() {
          return user;
        }
      };
      const controller = new UsersController(service);
      const req = { params: { id: 1 } };
      controller.getById(req, res).then(() => {
        expect(res.sendCalledWith).to.be.equal(user);
        done();
      });
    });
  });

  describe("Create", () => {
    it("should return status created", done => {
      const service = {
        create() {
          return {}
        }
      };
      const validator = {
        validate() {
          return undefined
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.create(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(201);
        done();
      });
    });
    it("should return created user", done => {
      const newUser = { firsName: "john" };
      const service = {
        create() {
          return newUser;
        }
      };
      const validator = {
        validate() {
          return undefined
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.create(req, res).then(() => {
        expect(res.sendCalledWith).to.be.equal(newUser);
        done();
      });
    });

    it("should return status bad request when validation fails", done => {
      const service = {
        create() {
          return {};
        }
      };
      const validator = {
        validate() {
          return { 'firstName': 'firstName is required' }
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.create(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(400);
        done();
      });
    });
  });

  describe("Update", () => {
    it("should return status no content", done => {
      const service = {
        getById() {
          return { id: 1 }
        },
        update() {
          return {}
        }
      };
      const validator = {
        validate() {
          return undefined
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.update(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(204);
        done();
      });
    });
    it("should return status bad request when validation fails", done => {
      const service = {};
      const validator = {
        validate() {
          return { 'firstName': 'firstName is required' }
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.update(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(400);
        done();
      });
    });
    it("should return status not found when choose to update user that doesn't exists", done => {
      const service = {
        getById() {
          return undefined
        }
      };
      const validator = {
        validate() {
          return undefined
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.update(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(404);
        done();
      });
    });
  });

  describe("Destroy", () => {
    it("should return status no content", done => {
      const service = {
        getById() {
          return { id: 1 }
        },
        destroy() {
          return {}
        }
      };
      const validator = {
        validate() {
          return undefined
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.destroy(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(204);
        done();
      });
    });

    it("should return status not found when choose to delete user that doesn't exists", done => {
      const service = {
        getById() {
          return undefined
        }
      };
      const validator = {
        validate() {
          return undefined
        }
      };
      const controller = new UsersController(service, validator);
      const req = { params: { id: 1 } };
      controller.update(req, res).then(() => {
        expect(res.statusCalledWith).to.be.equal(404);
        done();
      });
    });
  });
});
