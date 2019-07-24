import chai, { expect } from "chai";
import UsersController from "./../../controllers/UsersController";
import UserService from "./../../services/UserService";
import sinon from "sinon";
import { validateUser } from "./../../validators/validateUser";

describe.only("UsersController", () => {
  const req = {};
  let res = {
    sendCalledWith: '',
    statusCalledWith: '',
    status: function (arg) {
      this.statusCalledWith = arg;
    },
    send: function (arg) {
      this.sendCalledWith = arg;
    }
  };
  it("should get all users", done => {
    const service = {
      findAll: () => { }
    };
    var spy = sinon.spy(service, "findAll");
    const controller = new UsersController(service);
    controller.findAll(req, res).then(() => {
      expect(spy.calledOnce).to.be.ok;
      expect(res.statusCalledWith).to.be.equal(200);
      done();
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
      const user = {firsName: 'John', age: 30}
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
});
