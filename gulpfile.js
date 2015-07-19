'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var scss = require('gulp-sass');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');


// developer JS
gulp.task('djs',function(){
    // vendor libtrarys
    gulp.src([
        'bower/jquery/dist/jquery.js',
        'bower/angular/angular.js',
        'bower/angular-roure/angular-roure.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('builds/dev'));

    // custom scripts
    gulp.src(['builds/dev/app/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('builds/dev'))
});

//developer CSS
gulp.task('dcss',function(){
    gulp.src(['builds/dev/app/**/*.scss'])
        .pipe(scss())
        .pipe(concat('app.css'))
        //autoprefixer
        .pipe(gulp.dest('builds/dev'));

    gulp.src([
        'bower/bootstrap/dist/css/bootstrap.css',
        'bower/bootstrap/dist/css/bootstrap-theme.css'
    ])
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('builds/dev'));

});

gulp.task('dwatch', function(){
    gulp.watch('builds/dev/app/**/*.js',['djs']);
    gulp.watch('builds/dev/app/**/*.scss',['dcss']);
    gulp.watch('builds/dev/app/**/*.jade',['djade']);
});

//developer JADE
gulp.task('djade', function() {
    //var YOUR_LOCALS = {};
    gulp.src(['' +
        'builds/dev/app/jade/*.jade'
    ])
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./builds/dev'))
});

//develpoer IMG
gulp.task('dimg', function() {
    gulp.src('builds/dev/app/img/*')
        .pipe(gulp.dest('builds/dev/i'));
});

//developer HTML
//gulp.task('dhtml', function(){
//    gulp.src('builds/dev/app/**/*.html')
//        .pipe(gulp.dest('builds/dev'))
//
//})

//developer WEBSERVER
gulp.task('dwebserver', function(){
    gulp.src('builds/dev')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
});

// DEFAULT TASK
gulp.task('default',[
    'dev'
]);

// developer build
gulp.task('dev',[
    'djs',
    'dcss',
    'djade',
    //'dhtml',
    'dimg',
    'dwatch',
    'dwebserver'
]);

//production build
gulp.task('prod',[
    'pjs'
]);

