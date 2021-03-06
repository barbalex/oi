/*
 * holt sich nach einer Änderung in einem Feld die Daten
 * Vorsicht: Holt sich alle Daten als string
 * daher müssen sie in den richtigen Datentyp konvertiert werden
 */

'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  convertToCorrectType = require('./convertToCorrectType')

module.exports = function (that) {
  var value,
    $that = $(that)

  switch (that.type) {
    case 'text':
    case 'number':
    case 'textarea':
    case 'select-one':
    case 'radio':
      value = convertToCorrectType(that.value)
      break
    case 'checkbox':
      switch ($that.data('object').inputDataType) {
        case 'checkbox':
          value = $that.is(':checked')
          break
        case 'checkboxGroup':
          value = []
          _.each($('[name="' + $that.data('object')._id + $that.data('object').label + '"]:checked'), function (checkbox) {
            value.push(convertToCorrectType(checkbox.value))
          })
          break
      }
      break
  }
  return value
}
