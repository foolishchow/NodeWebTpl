define(function(require, exports, module) {
    var $ = require("jquery");


    var pagestyle = function() {
        var iframe = $("#workspace");
        var h = $(window).height() - iframe.offset().top;
        var w = $(window).width() - iframe.offset().left;
        if (h < 300)
            h = 300;
        if (w < 973)
            w = 973;
        iframe.height(h);
        iframe.width(w);
    }
    pagestyle();
    $(window).resize(pagestyle);
    

});