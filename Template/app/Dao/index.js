var promiseDao = require('./base/promise.dao.js');
var logger = getLogger(module);

module.exports = function(){
	var dao = promiseDao.apply(this,arguments);

	dao.on('error',function(err){
		logger.info("promiseDao emit error ...");
		logger.info("promiseDao emit error ... end");
	});

	return dao;
}

