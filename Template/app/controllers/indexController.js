
var exec = require("child_process").exec;
var encoding = require("encoding");
var logger = getLogger(module);
var home = {};

home.home = function(req, respond, next) {
    this.init();
    respond.render('index', { title: '后台管理' });
}
home.home.prototype.init = function() {
    console.info("init");
};

module.exports = home;
