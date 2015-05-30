/*
 * sets model object active
 * by setting attribute _active = true
 * if an object id is passed
 * resets existing _active = true first
 */

'use strict'

var _ = require('underscore'),
  getActiveObjects = require('./getActiveObjects'),
  getObject = require('./getObject')

module.exports = function (objId) {
  var activeObjects,
    object

  // first reset active objects
  activeObjects = getActiveObjects()
  _.each(activeObjects, function (activeObject) {
    delete activeObject._active
  })

  // set passed object as active
  if (objId) {
    object = getObject(objId)
    object._active = true
  }
}
