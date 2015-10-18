var path  = require('path');
var app   = require('./config/app');
var debug = require('debug')('Sockets:server');
var http  = require('http');
var settings = require('./config/settings');
var logger = getLogger(__filename);

global.database = require('./config/database.js');

module.exports.start = function (done) {

  var server = http.createServer(app);
  server.listen(settings.port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }


  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  
}








// If someone ran: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
  module.exports.start()
}
