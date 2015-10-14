var path     = require('path');
var express  = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var settings = require('./settings');
var partials = require('express-partials');
var logger   = require('./log4j');


module.exports = function (app) {

    // 静态资源目录
    app.use(express.static(settings.statics));
    // 页面目录
    app.set('views', settings.views);
    app.set('view engine', 'ejs');
    app.use(partials());
    // 常用的utils
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    // 日志配置
    // app.use(express.logger({ format: 'dev' }));
    app.use(logger);
    




    


};
