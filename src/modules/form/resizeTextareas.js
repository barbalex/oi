'use strict'

var $ = require('jquery'),
  fitTextareaToContent = require('./fitTextareaToContent')

module.exports = function () {
  $('#formContent').find('textarea').each(function () {
    fitTextareaToContent(this)
  })
}
