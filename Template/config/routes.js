
var controllers = require('../app/controllers')

module.exports = function (app) {
  app.get( '/'                           , load.controller(controllers.home.home) );
};
