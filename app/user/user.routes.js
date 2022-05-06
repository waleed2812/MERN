const controller = require('./user.controller') 

module.exports = function(app, version) {
  app.post(version + '/register', controller.register);
}