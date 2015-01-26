/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp     = require('gulp'),
    notifier = require('node-notifier');

return gulp.task('watch', function () {
    gulp.watch(
        [
            'images/*',
            'src/**/*',
            'index.html',
            'server.js'
        ],
        ['dev_src_when_watch']
    );
    gulp.watch(['style/oi.css'], ['dev_style']);
    gulp.watch(['src/templates/*.jade'], ['templates_when_watch']);
    notifier.notify({
        'title': 'dev code built',
        'message': 'watching now'
    });
});