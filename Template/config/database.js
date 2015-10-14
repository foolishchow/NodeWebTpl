var mysql  = require('mysql');
var settings = require('./settings.js');

var pool = mysql.createPool(settings.database);

exports.pool = pool;