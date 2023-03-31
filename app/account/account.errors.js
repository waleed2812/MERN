const { USER_TYPES } = require("../../config/constants");
const { addOrAndComma } = require("../../utils");

const errors = [
  {
    msgCode: "DUPLICATE_EMAIL",
    message: "email already exists.",
    data: {
      errors: {
        email: "email already taken.",
      },
    },
  },
  {
    msgCode: "INVALID_TOKEN",
    message: "Invalid token provided.",
    data: {
      errors: {
        token: "Invalid token provided.",
      },
    },
  },
  {
    msgCode: "USER_TYPE_REQUIRED",
    message: "must send user type as string.",
    data: {
      errors: {
        type: "must send user type as string.",
      },
    },
  },
  {
    msgCode: "INVALID_USER_TYPE",
    message: "invalid user type.",
    data: {
      errors: {
        type: "user type must be " + addOrAndComma(USER_TYPES),
      },
    },
  },
];

module.exports = errors;
