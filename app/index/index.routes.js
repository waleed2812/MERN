const controller = require('./index.controller');

module.exports = function(app, version) {
  app.get(version + '/', controller.index);
}