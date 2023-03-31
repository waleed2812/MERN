const controller = require('./index.controller');

module.exports = function(app, version) {
  const endpoint = version
  app.get(endpoint, controller.index);
}