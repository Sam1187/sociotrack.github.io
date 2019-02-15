'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var notify = require( 'gulp-notify' );
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');

// live reload
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    });
});

// html
gulp.task('html', function(){
    return gulp.src('src/*.html')
      .pipe(gulp.dest('build/'))
      .pipe(browserSync.stream());
});

// css
gulp.task('css', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe( sass().on( 'error', notify.onError(
            {
              message: "<%= error.message %>",
              title  : "Sass Error!"
            } ) ) )
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

// js
gulp.task('js', function(){
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});

// image
gulp.task('img', function(){
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.stream());
});



// Watch
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/js/*.js', ['js']);
});

// default
gulp.task('default', [ 'html', 'css', 'js', 'img', 'browser-sync', 'watch' ]);