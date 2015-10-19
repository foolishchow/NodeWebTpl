
var exec = require("child_process").exec;
var encoding = require("encoding");
var logger = getLogger(module);
var home = {};

home.home = function(req, respond, next) {
	debugger;
	console.info(this);
  respond.render('index', { title: '后台管理' });
}

module.exports = home;
