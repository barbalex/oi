'use strict'

var $ = require('jquery'),
  formButtonToolbar = require('../../../templates/formButtonToolbar'),
  positionFormBtngroup = require('./positionFormBtngroup'),
  setActiveObject = require('../setActiveObject')

module.exports = function () {
  var html

  html = formButtonToolbar()
  $('#formContent').html(html)
  positionFormBtngroup()
  setActiveObject()
}
