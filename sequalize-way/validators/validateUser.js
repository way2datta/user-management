import validate from "validate.js";
validate.validators.email.PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export default class UserValidator {
  validate(user) {
    return validate(user, this.getValidationRules());
  }
  getValidationRules() {
    return {
      firstName: {
        presence: {
          allowEmpty: false
        }
      },
      lastName: {
        presence: {
          allowEmpty: false
        }
      },
      email: {
        presence: {
          allowEmpty: false
        },
        email: true
      }
    }
  }
}