

var wrapper = function( func ){
    return function( req, respond, next ){
        new func(req, respond, next);
    }
}

module.exports = wrapper;