var path          = require('path');
var express       = require('express');
var settings      = require('./settings');
var environment   = require('./environment');
var routes        = require('./routes');
var routesDefault = require("./controllersDefault");

var load = require('../lib');


var app = express();

    debugger;
    global.load = load;

    environment(app);
    routes(app);
    routesDefault(app);
  

module.exports = app;


