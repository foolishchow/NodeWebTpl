var log4js = require('log4js');
var path = require('path');
var settings = require('./settings');


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

var prop = settings.log4js;

log4js.configure({
  appenders: appenders(prop),
  replaceConsole: prop.replaceConsole
});

var logger = log4js.getLogger('normal');
logger.setLevel('all');



//global.logger = logger;

global.getLogger = function(dir){
    return new lo(dir);
}


var log = log4js.connectLogger(logger, {level:log4js.levels.INFO});
module.exports = log;

var lo = function(dir){
    this.namespace = dir.replace(/\:/,"").replace(/(\/)/gm,".").replace(/(\\)/gm,".");

}
var l = lo.prototype;
l.escape = function(arg){
    var name = ( typeof arg[0] == "string" ) ? arg[0] : JSON.stringify( arg[0] );
    if( arg.length > 1 ){
        var index = 1;
        name = arg[0].replace(/({})/gm,function(wholeMatch,m1){
            return ( typeof arg[index] == "string" ) ? arg[index++] : JSON.stringify( arg[index++] );
        });
    }
    return [this.namespace + "-----------" + name];
}
l.log = function(){
    logger.log.apply(logger,this.escape(arguments));
}
l.info = function(){
   
    logger.info.apply(logger,this.escape(arguments));
}
l.error = function(){
    logger.error.apply(logger,this.escape(arguments));
}
l.debug = function(){
    logger.debug.apply(logger,this.escape(arguments));
}
l.warn = function(){
    logger.warn.apply(logger,this.escape(arguments));
}

// Dsss:\github\NodeWebTpl\Template\test-----------ReferenceError: logger is not defined
