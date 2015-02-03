/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp   = require('gulp'),
    concat = require('gulp-concat-sourcemap');

gulp.task('dev_src', function () {
    return gulp.src([
        './src/jquery.js',
        './src/jquery-ui.js',
        './src/perfect-scrollbar.js',
        './src/bootstrap.js',
        './src/jstree.js',
        './src/oi_browserified.js'
    ])
        .pipe(concat('oi_built.js'))
        .pipe(gulp.dest('./src'));
});