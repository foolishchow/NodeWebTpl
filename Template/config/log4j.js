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
global.logger = logger;


var log = log4js.connectLogger(logger, {level:log4js.levels.INFO});

module.exports = log;