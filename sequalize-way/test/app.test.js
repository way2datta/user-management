const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const models = require(__dirname + "/../models");

chai.use(chaiHttp);

const app = require(__dirname + "/../app");
describe("app", () => {
  it("should add two numbers", () => {
    expect(3 + 4).to.be.equal(7, "Mocha is not setup properly");
  });
  it("should return hello world", () => {
    chai
      .request(app)
      .get("/")
      .end((req, res) => {
        expect(res.text).to.be.equal(
          "Hello World!",
          "Home route is working properly."
        );
      });
  });

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
  it.only("should update user", () => {});

  it("should get user by id", () => {});
});
