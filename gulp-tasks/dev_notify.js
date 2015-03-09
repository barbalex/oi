/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp     = require('gulp'),
    notifier = require('node-notifier');

return gulp.task('dev_notify', function () {
    notifier.notify({
        'title': 'dev code built',
        'message': 'watching now'
    });
});