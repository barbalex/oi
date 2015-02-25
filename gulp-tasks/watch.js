/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp     = require('gulp'),
    notifier = require('node-notifier');

return gulp.task('watch', function () {
    gulp.watch(
        [
            'index.html',
            'server.js',
            'images/*',
            'src/oi.js',
            'src/modules/**/*.js',
            'src/templates/*.hdb',
            'gulp-tasks/createManifest.js'
        ],
        ['dev_when_watch']
    );
    gulp.watch(
        [ 'style/oi.css' ],
        ['dev_style']
    );
    notifier.notify({
        'title': 'dev code built',
        'message': 'watching now'
    });
});