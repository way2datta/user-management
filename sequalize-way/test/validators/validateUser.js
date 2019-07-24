import Validator from "./../../validators/validateUser";
import { expect } from "chai";

describe("validateUser", () => {
  var validator;
  beforeEach(()=>{
    validator = new Validator();
  })
  it("should not return error when user has all required fields", () => {
    const user = { firstName: "John", lastName: "Doe", email: "John@Doe.com" };
    const validationErrors = validator.validate(user);
    expect(validationErrors).to.be.equal(undefined);
  });

  it("should return lastName required error", () => {
    const user = { email: "John@doe.com", firstName: "Doe"};
    const validationErrors = validator.validate(user);
    expect(validationErrors).to.have.property("lastName");
  });

  it("should return email required error", () => {
    const user = { firstName: "John", lastName: "Doe"};
    const validationErrors = validator.validate(user);
    expect(validationErrors).to.have.property("email");
  });

  it("should return email invalid error", () => {
    const user = { firstName: "John", lastName: "Doe", email:"Johndoe.com"};
    const validationErrors = validator.validate(user);
    expect(validationErrors).to.have.property("email");
  });
  
});
