const controller = require("./account.controller");
const sessionController = require("../session/session.controller");
// const passport = require("../../config/passport");

module.exports = function (app, version) {
  app.post(version + "/register", controller.register);
  app.post(version + "/login", controller.login);
  app.get(
    version + "/profile",
    sessionController.isAuthenticated,
    controller.getProfile
  );
  app.delete(version + "/logout", sessionController.logout);
};
