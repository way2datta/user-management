export default function validate(user) {
  var validate = require("validate.js");
  validate.validators.email.PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return validate(user, getConstraints());
}

function getConstraints() {
  return {
    firstName: { presence: { allowEmpty: false } },
    lastName: { presence: { allowEmpty: false } },
    email: { presence: { allowEmpty: false }, email: true }
  };
}
