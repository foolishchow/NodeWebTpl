var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  views      : path.join(__dirname, '../display/views/'),
  statics    : path.join(__dirname, '../display/'),
  port       : process.env.NODE_PORT || 8080,
  database   : {
    port     : "3306", // "postgresql" or "mysql"
    // host     : "127.0.0.1",
    // database : "foolishchow",
    // user     : "foolishchow",
    // password : "foolishchow",
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test',
    connectionLimit: 10,
    supportBigNumbers: true
  },
  log4js : {
    appenders : [
        { type          : "console" }, //控制台输出
        {
          type          : "dateFile", //文件输出
          filename      : path.join(__dirname, "../../logs/comic/access.log"), 
          RelativePath  : false, //是否根据当前路径 的相对路劲
          maxLogSize    : 10240,
          backups       : 3,
          category      : "normal" ,
          type          : "dateFile",
          pattern       : "-yyyy-MM-dd"
        }
    ],
    replaceConsole : true,
    logger:[
      {
        name     : 'debug',
        category : 'normal',
        level     : 'all'
      }
    ]
  }
};

module.exports = settings;
