export default function validate(user) {
  var validate = require("validate.js");
  return validate(user, getConstraints());
}

function getConstraints() {
  return {
    firstName: { presence: { allowEmpty: false } },
    lastName: { presence: { allowEmpty: false } },
    email: { presence: { allowEmpty: false } }
  };
}
