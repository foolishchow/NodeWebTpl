


var load = function(){
    var path = module.dirname;
};
var _load = {};

["Service","Controller","Dao"].forEach(function(convertName){

    _load[ convertName.toLowerCase() ] = require(  './_' +  convertName.toLowerCase() +"Wrapper" );
    load[ convertName.toLowerCase() ] = function(func){
        return _load[ convertName.toLowerCase() ](func);
    }
});

module.exports = load;