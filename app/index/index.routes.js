const indexController = require('./index.controller');

module.exports = function(app, prefix) {
  app.get(prefix + '/', indexController.index);
}