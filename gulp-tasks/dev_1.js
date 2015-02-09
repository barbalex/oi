/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var fs             = require('fs'),
    gulp           = require('gulp'),
    requireDir     = require('require-dir'),
    createManifest = require('./createManifest');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('dev_1', ['templates'], function () {
    fs.writeFile('oi.appcache', createManifest());
    gulp.start('dev_2');
});