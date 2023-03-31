const { toTitleCase } = require("./reformers");
const validator = require("validator");

exports.validateEmail = function (email) {
  if (!email && typeof email !== "string") {
    throw { msgCode: "EMAIL_REQUIRED" };
  }
  email = email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    throw { msgCode: "INVALID_EMAIL" };
  }
  return email;
};

exports.validateName = function (name) {
  if (!name || typeof name !== "string") {
    throw { msgCode: "NAME_REQUIRED" };
  }
  if (name?.search(/[^a-zA-Z\s]/) !== -1) {
    throw { msgCode: "INVALID_NAME" };
  }
  return toTitleCase(name);
};

exports.validatePassword = function (password) {
  if (!password && typeof password !== "string") {
    throw { msgCode: "PASSWORD_REQUIRED" };
  }
  if (!validator.isStrongPassword(password)) {
    throw { msgCode: "INVALID_PASSWORD" };
  }
  return password;
};

/* --------------------------------- Boolean -------------------------------- */

exports.isName = function (name) {
  try {
    exports.validateName(name);
    return true;
  } catch(err) {
    return false;
  };
};