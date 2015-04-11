/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp       = require('gulp'),
    requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('watch', function () {
    gulp.watch(
        [
            'index.html',
            'package.json',
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
});