const controller = require("./user.controller");
const passport = require("../../config/passport");

module.exports = function (app, version) {
  version += "/user";
  app.post(
    version + "/register",
    controller.register,
    controller.loginSuccess
  );
  app.post(
    version + "/login",
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
