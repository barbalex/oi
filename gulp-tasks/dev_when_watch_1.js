/**
 * Baut das Projekt für die Entwicklung:
 * zuerst mit browserify Module einbinden
 * dann style und src_1 und src_2 (hinter Body)
 * dann watch
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var fs             = require('fs'),
    gulp           = require('gulp'),
    requireDir     = require('require-dir'),
    createManifest = require('./createManifest');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('dev_when_watch_1', ['templates'], function () {
    fs.writeFile('oi.manifest', createManifest());
    gulp.start('dev_when_watch_2');
});