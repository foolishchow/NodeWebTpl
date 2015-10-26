
var interceptorList = new Array();

var wrapper = function( func ){
    return function( req, respond, next ){
        new func(req, respond, next);
    }
}
wrapper.addInterceptor = function(obj){
    interceptorList.push(obj);
}

var interceptor = function(){

}
module.exports = wrapper;