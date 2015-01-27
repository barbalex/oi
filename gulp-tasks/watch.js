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
            'server.js',
            '-src/oi_brwoserified.js',
            '-src/oi_built.js',
            '-src/oi_built.js.map'
        ],
        ['dev_src_when_watch']
    );
    gulp.watch(
        [
            'style/oi.css',
            '-style/oi_built.css',
            '-style/oi_built.css.map'
        ],
        ['dev_style']
    );
    gulp.watch(
        ['src/templates/*.jade'],
        ['templates_when_watch']
    );
    notifier.notify({
        'title': 'dev code built',
        'message': 'watching now'
    });
});