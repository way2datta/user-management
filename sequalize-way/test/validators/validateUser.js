import validateUser from "./../../validators/validateUser";
import chai, { expect } from "chai";

describe("validateUser", () => {
  it("should not return error when user has all required fields", () => {
    const user = { firstName: "John", lastName: "Doe", email: "John@Doe.com" };
    const validationErrors = validateUser(user);
    expect(validationErrors).to.be.equal(undefined);
  });

  it("should return lastName required error", () => {
    const user = { email: "John@doe.com", firstName: "Doe"};
    const validationErrors = validateUser(user);
    expect(validationErrors).to.have.property("lastName");
  });

  it("should return email required error", () => {
    const user = { firstName: "John", lastName: "Doe"};
    const validationErrors = validateUser(user);
    expect(validationErrors).to.have.property("email");
  });

  it("should return email invalid error", () => {
    const user = { firstName: "John", lastName: "Doe", email:"Johndoe.com"};
    const validationErrors = validateUser(user);
    expect(validationErrors).to.have.property("email");
  });
  
});
