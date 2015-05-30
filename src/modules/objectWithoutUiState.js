/*
 * removes ui state from object
 * necessary before writing to the database
 */

'use strict'

var $ = require('jquery')

module.exports = function (object) {
  var objectToSave

  // make a copy of the object
  objectToSave = $.extend(true, {}, object)
  if (objectToSave._active) {
    // remove because db does not accept it
    delete objectToSave._active
  }
  return objectToSave
}
