import chai, { expect } from "chai";
import UsersController from "./../../controllers/UsersController";
import UserService from "./../../services/UserService";
import sinon from "sinon";
import { validateUser } from "./../../validators/validateUser";

describe("UsersController", () => {
  let res;

  it("should get all users", done => {
    const service = {
      findAll: () => {}
    };
    var spy = sinon.spy(service, "findAll");

    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ send: sinon.spy }) // to spy res.status(500).end()
    };

    const controller = new UsersController(service);
    const req = {};
    controller.findAll(req, res).then(() => {
      expect(spy.calledOnce).to.be.ok;
      done();
    });
  });
  it("should get by id", done => {
    const service = {
      getById: () => {}
    };
    var spy = sinon.stub(service, "getById");

    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ send: sinon.spy })  
    };

    const controller = new UsersController(service);
    const req = { params: { id: 1 } };
    controller.getById(req, res).then(() => {
      expect(spy.calledWith).to.be.ok;
      done();
    });
  });
});
