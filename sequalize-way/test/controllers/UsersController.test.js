import chai, { expect } from "chai";
import UsersController from "./../../controllers/UsersController";
import sinon from "sinon";

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
});
