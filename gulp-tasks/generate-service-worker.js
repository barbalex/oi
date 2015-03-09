/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var gulp       = require('gulp'),
    requireDir = require('require-dir'),
    swPrecache = require('sw-precache'),
    fs         = require('fs'),
    rootDir    = null;

requireDir('../gulp-tasks', {recurse: true});

gulp.task('generate-service-worker', function (callback) {
    swPrecache({
        staticFileGlobs: ['index.html', 'images/favicon.ico', 'src/oi_built.js', 'style/jstree.css', 'style/oi_built.css'],
        stripPrefix: rootDir
    }, function(error, swFileContents) {
        if (error) {
            return callback(error);
        }
        //fs.writeFile(path.join(rootDir, 'service-worker.js'), swFileContents, callback);
        fs.writeFile('service-worker.js', swFileContents, callback);
    });
});