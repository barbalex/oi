/**
 * Baut das Projekt für die Entwicklung:
 * zuerst jsx templates bauen
 * dann style und src_1 und src_2 (hinter Body)
 * dann watch
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp       = require('gulp'),
    requireDir = require('require-dir');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('dev', ['templates'], function () {
    gulp.start('dev_2');
});