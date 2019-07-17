import chai, {expect} from "chai";
import chaiHttp from  "chai-http";
import models from "../models";

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
        expect(res.status).to.be.equal(200);
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
        expect(res.status).to.be.equal(201);
        expect(res.body.email).to.be.equal("John@Doe.com");
        done();
      });
  });

  it("should not create user if email is missing", done => {
    chai
      .request(app)
      .post("/api/users")
      .send({ firstName: "John", lastName: "Doe" })
      .end((req, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal({
          errors: { message: "Email is required.", field: "Email" }
        });
        done();
      });
  });
  
  it("should update user", done => {
    models.User.findOne({ where: { email: "Jane@Doe.com" } }).then(user => {
      const existingUser = user.get({
        plain: true
      });
      chai
        .request(app)
        .put("/api/users/" + existingUser.id)
        .send({ firstName: "Johnny" })
        .end((req, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
  });

  it("should delete user by id", done => {
    models.User.findOne({ where: { email: "Jane@Doe.com" } }).then(user => {
      const existingUser = user.get({
        plain: true
      });
      chai
        .request(app)
        .delete("/api/users/" + existingUser.id)
        .end((req, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
  });

  it("should get user by id", done => {
    models.User.findOne({ where: { email: "Jane@Doe.com" } }).then(user => {
      const existingUser = user.get({
        plain: true
      });
      chai
        .request(app)
        .get("/api/users/" + existingUser.id)
        .end((req, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.id).to.be.equal(existingUser.id)
          done();
        });
    });
  });
});
