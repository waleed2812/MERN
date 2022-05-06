exports.validateEmail = function (email) {
  return RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}").test(email);
};

exports.validatePassword = function (password) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }
  if (password.search(/[0-9]/) === -1) {
    throw new Error("Password must include a digit.");
  }
  if (password.search(/[a-z]/) === -1) {
    throw new Error("Password must include a lowercase letter.");
  }
  if (password.search(/[A-Z]/) === -1) {
    throw new Error("Password must include a uppercase letter.");
  }
  if (password.search(/[^0-9a-zA-Z]/) === -1) {
    throw new Error("Password must include a special character.");
  }
  return password;
};
