'use strict'

var _ = require('underscore')

module.exports = function () {
  // first reset active objects
  var activeObjects = _.filter(window.oi.objects, function (object) {
    return object._active && object._active === true
  })
  return activeObjects
}
