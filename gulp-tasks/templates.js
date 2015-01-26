/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade');

gulp.task('templates', function () {
    return gulp.src('templates/*.jade')
        .pipe(jade({
            client: true
        }))
        .pipe(gulp.dest('./templates'));
});