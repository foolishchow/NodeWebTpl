// /**
//  * 静态资源配置文件.
//  */

// /**
//  * 组件安装
//  * npm install gulp-util gulp-uglify gulp-header gulp-clean gulp-trimlines gulp-minify-css gulp-minify-html gulp-usemin gulp-rev-append stream-combiner2 --save-dev
//  */

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var clean = require('gulp-clean');
var minifyCSS = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var combiner = require('stream-combiner2');
// var minifyInline = require('gulp-minify-inline');
var trimlines = require('gulp-trimlines');
var fs = require('fs'); 

var usemin = require('gulp-usemin');
// var uglify = require('gulp-uglify');
// var minifyHtml = require('gulp-minify-html');
// var minifyCss = require('gulp-minify-css');
// var rev = require('gulp-rev');
var rev = require('gulp-rev-append');

// 购物车项目路径, 新增需要合并部署的页面增加到配置文件里
var cartSrc = [
    './project/cart/cart1.html',
    './project/cart/cart2.html',
    './project/cart/cartAddressDefineSh.html',
    './project/cart/cartAddCoupon.html',
    './project/cart/cartAddressDefineZt.html',
    './project/cart/cartAddressList.html',
    './project/cart/cartFourOrdersView.html',
    './project/cart/cartSaveCoupon.html',
    './project/cart/cartSaveCouponOversea.html',
    './project/cart/cartSplitOrders.html',
    './project/cart/weixinPayConfirm.html',
    './project/cart/cartCoupon.html',
    './project/cart/payConfirm.html'
];

gulp.task('project', function () {
    console.log('合并静态资源');
    // 购物车项目
    // 
    for (var i = cartSrc.length - 1; i >= 0; i--) {
        gulp.src(cartSrc[i])
          .pipe(usemin())
          .pipe(gulp.dest('./project/cart'));
    };
    
    gulp.src([
        './project/cart/script/cart/cart2_v2',
        './project/cart/script/cart/cart4',
        './project/cart/script/cart/coupon_v2'
    ], { read: false })
    .pipe(clean({force: true}));

});

gulp.task('htmlmin',['project'], function(){
    setTimeout(function(){
        console.log('压缩html中...');
        gulp.src('./project/**/*.html')
            .pipe(rev())
            .pipe(trimlines({
                leadingPattern:  '[ \\t,\\n,\\r]+'
            }))
            // .pipe(minifyInline({jsSelector: 'script[type!="text/html"]'}))
            .pipe(minifyHtml({spare : false,quotes: true,comments :false,empty:true}))
            .pipe(gulp.dest('./project'));
    }, 3000);
        

})


gulp.task('uglyfy', ['project'],function(){
        
        // 静态资源
        setTimeout(function(){

            // 监听压缩问题
            var combinedCommon = combiner.obj([
                gulp.src(['./common/**/*.js']).pipe(uglify())
            ]);

            // combined.on('error', console.error.bind(console));
            combinedCommon.on('error',  function(e){
                console.error("代码不符合规范！\n error-file :" + e.fileName + "; \n" + " lineNumber:" + e.lineNumber);
            });
            
            console.log('开始压缩 js css，请等待');
            gulp.src([
                './common/**/*.js',
                '!./common/script/buriedpoint.js',
                '!./common/script/module/**/3.0.0/*.js'
            ])
            .pipe(uglify())
            .pipe(header('/* suning.com '  + new Date().getTime() + ' */' ))
            .pipe(gulp.dest('./common'));


            
            // 
            gulp.src('./common/**/*.css')
                .pipe(minifyCSS({noAdvanced: true}))
                .pipe(header('/* suning.com '  + new Date().getTime() + ' */ @charset "utf-8";' ))
                .pipe(gulp.dest('./common'));
            // 监听压缩问题
            var combined = combiner.obj([
                gulp.src('./project/**/*.js').pipe(uglify())
              ]);

            // combined.on('error', console.error.bind(console));
            combined.on('error',  function(e){
                console.error("代码不符合规范！\n error-file :" + e.fileName + "; \n" + " lineNumber:" + e.lineNumber);
            });
            
            gulp.src('./project/**/*.js')
                .pipe(uglify())
                .pipe(header('/* suning.com '  + new Date().getTime() + ' */' ))
                .pipe(gulp.dest('./project'));
            
            gulp.src('./project/**/*.css')
                .pipe(minifyCSS({noAdvanced: true}))
                .pipe(header('/* suning.com '  + new Date().getTime() + ' */ @charset "utf-8";' ))
                .pipe(gulp.dest('./project'));
        }, 5000);
        
    
})



gulp.task('clean',['uglyfy'], function(){
    console.error("清理文件中...");
    gulp.src([
        './gulpfile.js',
        './package.json',
        './node_modules',
        './ReadMe.md'
    ], { read: false })
    .pipe(clean({force: true}));
})

// 执行默认任务
gulp.task('default', ['project','htmlmin','uglyfy','clean']);
