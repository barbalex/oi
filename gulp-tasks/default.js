/**
 * Baut das Projekt für die Entwicklung:
 * zuerst mit browserify Module einbinden
 * dann style und src_1 und src_2 (hinter Body)
 * dann watch
 */

'use strict'

var gulp = require('gulp'),
  requireDir = require('require-dir')

requireDir('../gulp-tasks', {recurse: true})

gulp.task('default', ['dev'])
