'use strict'

var createTreeNodeObject = require('./createTreeNodeObject')

module.exports = function (object) {
  var jstreeObject

  jstreeObject = createTreeNodeObject(object)
  jstreeObject.parent = '#'
  return jstreeObject
}
