import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import models from "../models";
import HttpStatus from "http-status-codes";

chai.use(chaiHttp);

import app from "../app.js";

describe("Users", () => {
  beforeEach(done => {
    models.sequelize
      .sync({
        force: true,
        logging: false
      })
      .then(() => {
        return models.User.create({
          firstName: "Jane",
          lastName: "Doe",
          email: "Jane@Doe.com",
          createdAt: "2018-01-23 01:23:00",
          updatedAt: "2018-03-08 09:34:00"
        });
      })
      .then(() => {
        done();
      });
  });

  it("should get all users", done => {
    chai
      .request(app)
      .get("/api/users")
      .end((req, res) => {
        expect(res.status).to.be.equal(HttpStatus.OK);
        expect(res).to.be.json;
        expect(res.body.length).to.be.equal(1);
        done();
      });
  });

  it("should create user", done => {
    chai
      .request(app)
      .post("/api/users")
      .send({ firstName: "John", lastName: "Doe", email: "John@Doe.com" })
      .end((req, res) => {
        expect(res.status).to.be.equal(HttpStatus.CREATED);
        expect(res.body.email).to.be.equal("John@Doe.com");
        done();
      });
  });

  it("should not create user if required fields are missing", done => {
    chai
      .request(app)
      .post("/api/users")
      .send({ firstName: "John" })
      .end((req, res) => {
        expect(res.status).to.be.equal(HttpStatus.BAD_REQUEST);
        expect(res.body).to.have.property("email");
        expect(res.body).to.have.property("lastName");
        done();
      });
  });

  it("should update user", done => {
    models.User.findOne({}).then(user => {
      const existingUser = user.get({
        plain: true
      });
      chai
        .request(app)
        .put("/api/users/" + existingUser.id)
        .send({
          firstName: "Jane",
          lastName: "Doe",
          email: "Jane@Doe.com"
        })
        .end((req, res) => {
          expect(res.status).to.be.equal(HttpStatus.NO_CONTENT);
          done();
        });
    });
  });

  it("should not update user if required fields are missing", done => {
    models.User.findOne({}).then(user => {
      const existingUser = user.get({
        plain: true
      });
      chai
        .request(app)
        .put("/api/users/" + existingUser.id)
        .send({
          lastName: "Doe"
        })
        .end((req, res) => {
          expect(res.status).to.be.equal(HttpStatus.BAD_REQUEST);
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("firstName");
          done();
        });
    });
  });

  it("should respond with not found if choose to update user that does not exists", () => {
    chai
      .request(app)
      .put("/api/users/1001")
      .send({
        firstName: "Jane",
        lastName: "Doe",
        email: "Jane@Doe.com"
      })
      .end((req, res) => {
        expect(res.status).to.be.equal(HttpStatus.NOT_FOUND);
      });
  });
  it("should delete user by id", done => {
    models.User.findOne().then(user => {
      const existingUser = user.get({
        plain: true
      });
      chai
        .request(app)
        .delete("/api/users/" + existingUser.id)
        .end((req, res) => {
          expect(res.status).to.be.equal(HttpStatus.NO_CONTENT);
          done();
        });
    });
  });

  it("should get not found status when choose to delete user that does not exists", done => {
    chai
      .request(app)
      .delete("/api/users/1001")
      .end((req, res) => {
        expect(res.status).to.be.equal(HttpStatus.NOT_FOUND);
        done();
      });
  });

  it("should get user by id", done => {
    models.User.findOne().then(user => {
      const existingUser = user.get({
        plain: true
      });
      chai
        .request(app)
        .get("/api/users/" + existingUser.id)
        .end((req, res) => {
          expect(res.status).to.be.equal(HttpStatus.OK);
          expect(res.body.id).to.be.equal(existingUser.id);
          done();
        });
    });
  });

  it("should get not found status when user by id is not present", done => {
    chai
      .request(app)
      .get("/api/users/1001")
      .end((req, res) => {
        expect(res.status).to.be.equal(HttpStatus.NOT_FOUND);
        done();
      });
  });
});
