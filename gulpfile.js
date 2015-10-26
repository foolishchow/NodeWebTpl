'use strict';

var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');
var glob = require('glob');
var del = require('del');
var connect = require('gulp-connect');
var open = require('gulp-open');


function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i=0;i<iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                     return alias.address;
               }
          }
    }
}

var config = {
    port: 8888,
    devBaseUrl: 'http://' + getIPAdress(),
    paths: {
        html: './src/*.html',
        dist: './dist'
    }
};

//启动connect服务
gulp.task('connect', function() {
    connect.server({
        root: '../../',
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//打开浏览器
gulp.task('open', function() {
     gulp.src('./index.html')
         .pipe(open({app: 'chrome', uri: config.devBaseUrl + ':' + config.port + '/' })); 
});

//构建after.js
function buildSNNativeClient() {
    console.log('building...SNNativeClient.js');
    browserify({
        entries: './src/javascripts/common/SNNativeClient.js'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('SNNativeClient.js'))
    .pipe(gulp.dest('./javascripts'));
}

//构建微信分享
function buildWeChat() {
    console.log('Copying...WebChatShare');
     gulp.src('src/javascripts/common/wechatShare.js')
        .pipe(gulp.dest('./javascripts'));

     gulp.src('src/javascripts/lib/jweixin/1.0.0/jweixin-1.0.0.js')
        .pipe(gulp.dest('./javascripts'));
}

function buildBefore(){
     browserify({
        entries: './src/javascripts/before.js'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('before.js'))
    .pipe(gulp.dest('./javascripts'));
}

function buildSuccess() {
    browserify({
        entries: './src/javascripts/success.js'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('success.js'))
    .pipe(gulp.dest('./javascripts'));
}

//构建业务
gulp.task('build', function() {
    buildBefore();
    buildWeChat();
    browserify({
        entries: './src/javascripts/app.js'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./javascripts'));
    buildSNNativeClient();
    buildSuccess();
});

//拷贝HTML
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

//拷贝CSS
gulp.task('css', function() {
    gulp.src('src/stylesheets/**')
        .pipe(gulp.dest('./stylesheets'))
        .pipe(connect.reload());
});

//拷贝Image
gulp.task('image', function() {
    gulp.src('src/images/**')
        .pipe(gulp.dest('./images'))
        .pipe(connect.reload());
});

//拷贝静态文件到发布目录
gulp.task('copy', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('./'));

    gulp.src('src/stylesheets/**')
        .pipe(gulp.dest('./stylesheets'));

    gulp.src('src/images/**')
        .pipe(gulp.dest('./images'));
});

//观察文件变化
gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['build']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/**/*.png', ['image']);
    gulp.watch('src/*.html', ['html']);
});


gulp.task('default',  ['copy', 'build', 'connect','watch', 'open']);
