var helper    = require('../../util/Helper');
var translate = require('./sqlTranselate');

var baseDao = function(){
    //this.thenobj = new helper.Thenjs();
    this.connection = {};
    this.prepared = false;
}
var prop = baseDao.prototype;

prop.then = function(func){
    this.thenobj = this.thenobj.then(function(cont){
        func();
    });
    return this;
}
prop.prepare = function(){
    var me = this;
    if( this.prepared ) return;
    this.thenobj = helper.Thenjs(function(cont){
        global.database.pool.getConnection(function(err, connection) {
            if (err) {
                throw err;
            }
            me.connection = connection;
            cont(null);
        });
    });
    me.prepared = true;
    return this;
}
prop.addQuery = function(sql,array,func){
    var me = this;
    this.prepare();

    this.thenobj = this.thenobj.then(function(cont){
        logger.info("prepare sql : " + sql);
        logger.info("prepare param : " + JSON.stringify(array));
        me.connection.query(sql, array , function(err, results) {
            if (err) {
                throw err;
            }
            func(results);
            cont(null);
        });
    });
    return this;
};
prop.excute = function(){
    var me = this;
    this.thenobj = this.thenobj.fail(function(cont,err){
        me.connection.release();
        me.released = true;
    });
    this.thenobj = this.thenobj.fin(function(cont,err){
        logger.info('finally release connection!');
        if( !me.released ) me.connection.release();
    });
    return this;
}



excute.base = function(){
    return new baseDao();
};

module.exports = function(){

};