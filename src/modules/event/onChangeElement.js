'use strict'

var $ = require('jquery'),
  getValueAfterChange = require('../form/getValueAfterChange'),
  saveObjectValue = require('../form/saveObjectValue')

module.exports = function () {
  var value = getValueAfterChange(this),
    object = $(this).data('object')

  saveObjectValue(object, value)
}
