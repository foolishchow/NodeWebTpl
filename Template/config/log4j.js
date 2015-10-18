var log4js = require('log4js');
var path = require('path');
var settings = require('./settings');

/**
 * [appenders 从配置文件中处理log4js的配置]
 * @param  {[type]} props [系统配置]
 * @return {[type]}       [log4js配置对象]
 */
var appenders = function(props){
    var appender = props.appenders;
    for( var i = 0 ; i < appender.length ; i++ ){
        var append = appender[i];
        if( append.filename && append.RelativePath ){
            append.filename = path.join(__dirname, append.filename );
            delete append.RelativePath;
        }else{
            append.filename =  append.filename ;
            delete append.RelativePath;
        }
    }
    return appender;
}

/**
 * [prop 系统设定的属性配置]
 */
var prop = settings.log4js;

log4js.configure({
    appenders: appenders(prop),
    replaceConsole: prop.replaceConsole
});

var loggerFormat = prop.logger;

var logger = log4js.getLogger( loggerFormat.category );
logger.setLevel( loggerFormat.level );

/**
 * [logger 如果使用了logger 并且没有getLogger  使用系统默认的logger]
 */
global.logger = logger;


/**
 * [getLogger 全局获取当前module的logger]
 * @param  {[type]} dir [当前module的路径]
 */
global.getLogger = function(dir){

    /**
     * [log log4js prifix前缀实现]
     * @param  {[type]} dir [description]
     * @return {[type]}     [description]
     */
    var log = function(dir){ 
        dir = typeof dir == 'string' ? dir : dir.filename;
        // 如果入参是module,取他的文件路径
        var index = dir.indexOf(prop.projectName) + prop.projectName.length + 1;
        dir = dir.substring(index);
        this.namespace = dir.replace(/((\w|(\.))+)(\.js)/,function(wholeMatch,m1,m2){
                                return m1;
                            })
                            .replace(/\:/,"")
                            .replace(/(\/)/gm,"..")
                            .replace(/(\\)/gm,"..");

    };

    ['Trace','Debug','Info','Warn','Error','Fatal', 'Mark'].forEach(
        function(levelString) {
            log.prototype[levelString.toLowerCase()] = function () {
                var arr = [];
                    arr.push(this.namespace);
                    arr.push("-----");
                    for( var i = 0 ; i < arguments.length ; i++ ){
                        arr.push(arguments[i]);
                    }
                logger[levelString.toLowerCase()].apply(logger,arr);
            };
        }
    );
    return new log(dir);
}

var logger4express = log4js.connectLogger(logger, {level:log4js.levels.INFO});
module.exports = logger4express;




// app.Dao.b______ase.promise.dao.js
