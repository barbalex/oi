/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var fs             = require('fs'),
    gulp           = require('gulp'),
    requireDir     = require('require-dir'),
    runSequence    = require('run-sequence'),
    createManifest = require('./createManifest');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('dev', function () {
    fs.writeFile('oi.appcache', createManifest(), { encoding: 'utf8'});
    runSequence(
        'templates',
        'browserify',
        ['dev_style', 'dev_src'],
        'watch',
        'dev_notify'
    );
});