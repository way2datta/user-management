import { expect } from "chai";
import models from "../../src/models";

describe("UserModel", () => {
  const firstName = "Johny";
  const lastName = "Johny";
  const email = "Johny";

  afterEach(done => {
    models.sequelize
      .sync({
        force: true,
        logging: false
      })
      .then(() => {
        done();
      });
  });
  it("should create user", async () => {
    const user = await models.User.create({ firstName, lastName, email });
    expect(user).to.have.property("firstName", firstName);
    expect(user).to.have.property("lastName", lastName);
    expect(user).to.have.property("email", email);
  });

  it("should not create user if firstName is not given", async () => {
    var errorMessage;
    try {
      await models.User.create({ lastName, email });
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).to.have.string("firstName cannot be null");
  });

  it("should not create user if lastName is not given", async () => {
    var errorMessage;
    try {
      await models.User.create({ firstName, email });
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).to.have.string("lastName cannot be null");
  });

  it("should not create user if email is not given", done => {
    models.User.create({ firstName, lastName }).catch(error => {
      expect(error.message).to.have.string("email cannot be null");
      done();
    });
  });
});
