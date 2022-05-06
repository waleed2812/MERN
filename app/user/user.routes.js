const controller = require("./user.controller");
const passport = require("../../config/passport");

module.exports = function (app, version) {
  version += "/user";
  app.post(
    version + "/register",
    passport.isNotAuthenticated,
    controller.register
  );
  app.post(
    version + "/login",
    passport.isNotAuthenticated,
    controller.login,
    controller.loginSuccess
  );
  app.get(
    version + "/login",
    passport.isAuthenticated,
    controller.loginSuccess
  );
  app.get(
    version + "/profile",
    passport.isAuthenticated,
    controller.getProfile
  );
  app.delete(
    version + "/logout",
    passport.isAuthenticated,
    passport.logout
  );
};
