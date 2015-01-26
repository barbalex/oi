/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat-sourcemap');

gulp.task('dev_style', function () {
    return gulp.src([
        'style/bootstrap.css',
        'style/jquery-ui.css',
        'style/jquery-ui.structure.css',
        'style/oi.css'
    ])
        .pipe(concat('oi_built.css'))
        .pipe(gulp.dest('./style'));
});