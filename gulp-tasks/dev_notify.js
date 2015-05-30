'use strict'

var gulp = require('gulp'),
  notifier = require('node-notifier')

gulp.task('dev_notify', function () {
  notifier.notify({
    'title': 'dev code built',
    'message': 'watching now'
  })
})
