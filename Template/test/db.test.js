
require('../config/log4j.js');
global.database = require('../config/database.js');
var baseDao = require('../app/Dao/');

var sql = "select * from td_m_resource where id =?";
var array = ['1'];
var array1 = ['6','4','4'];
var array2 = ['6','5','5'];
var sql1 = "insert into td_m_resource(id,name,token)  values(?,?,?)";

/**
 * [logger description]
 * @type {[type]}
 */


var logger = getLogger(module);
try{

	var bd = baseDao(true);
		
		bd
		.addQuery(sql,array,function(result){
			logger.info("000");
			logger.info(result);
		})
		.addQuery(sql1,array1,function(result){
			logger.info("001");
			logger.info(result);
		})
		.addQuery(sql1,array2,function(result){
			logger.info("002");
			logger.info(result);
		})
		.excute(function(){
			logger.info("baseDao emit success ...");
			logger.info("aaa");
			logger.info("baseDao emit success ... end");
		});
	
}catch(e){
	logger.info("---------------catch");
	logger.info(e);
}
