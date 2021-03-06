/*
 * erstellt einen service-worker, der die staticFileGlobs lokal holt, wenn keine Internetverbindung besteht
 * Quelle: http://updates.html5rocks.com/2015/02/offline-first-with-sw-precache
 */

'use strict'

var gulp = require('gulp'),
  swPrecache = require('sw-precache'),
  fs = require('fs'),
  rootDir = null

gulp.task('generate-service-worker', function (callback) {
  swPrecache({
    staticFileGlobs: [
      'index.html',
      'images/favicon.ico',
      'src/oi_built.js',
      'style/jstree.css',
      'style/oi_built.css'
    ],
    stripPrefix: rootDir,
    maximumFileSizeToCacheInBytes: 7000000
  }, function (error, swFileContents) {
    if (error) {
      return callback(error)
    }
    // fs.writeFile(path.join(rootDir, 'service-worker.js'), swFileContents, callback)
    fs.writeFile('service-worker.js', swFileContents, callback)
  })
})
