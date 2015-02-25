/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp       = require('gulp'),
    requireDir = require('require-dir'),
    notifier   = require('node-notifier');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('dev_notify', function () {
    notifier.notify({
        'title': 'dev code built',
        'message': 'watching now'
    });
});