const controller = require("./account.controller");
const passport = require("../../config/passport");

module.exports = function (app, version) {
  const endpoint = version + "/account";
  app.post(endpoint + "/register", controller.register);
  app.post(endpoint + "/forget", controller.forget);
  app.post(endpoint + "/otp", controller.otp);
  app.post(endpoint, controller.login, controller.loginSuccess);
  app.put(endpoint + "/forget", controller.updatePassword);
  app.put(endpoint, passport.isAuthenticated, controller.putProfile);
  app.get(endpoint, passport.isAuthenticated, controller.getProfile);
  app.delete(endpoint + "/delete", passport.isAuthenticated, controller.delete);
  app.delete(endpoint, passport.isAuthenticated, passport.logout);
};
