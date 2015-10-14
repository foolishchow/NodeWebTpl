
var exec = require("child_process").exec;
var encoding = require("encoding");

var home = {};
home.home = function(req, respond, next) {
  respond.render('index', { title: '后台管理' });
}

module.exports = home;
