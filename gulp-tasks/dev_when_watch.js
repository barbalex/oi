/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var fs             = require('fs'),
    gulp           = require('gulp'),
    requireDir     = require('require-dir'),
    runSequence    = require('run-sequence'),
    createManifest = require('./createManifest');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('dev_when_watch', function () {
    fs.writeFile('oi.appcache', createManifest());
    runSequence(
        'templates',
        'browserify',
        'dev_src'
    );
});