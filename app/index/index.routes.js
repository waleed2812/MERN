const indexController = require('./index.controller');

module.exports = function(app, version) {
  app.get(version + '/', indexController.index);
}