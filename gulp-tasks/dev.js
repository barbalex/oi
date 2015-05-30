'use strict'

var fs = require('fs'),
  gulp = require('gulp'),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence'),
  createManifest = require('./createManifest')

requireDir('../gulp-tasks', {recurse: true})

gulp.task('dev', function () {
  fs.writeFile('oi.appcache', createManifest(), { encoding: 'utf8'})
  runSequence(
    'templates',
    'browserify',
    ['dev_style', 'dev_src', 'generate-service-worker'],
    'watch',
    'dev_notify'
  )
})
