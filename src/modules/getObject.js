'use strict'

var _ = require('underscore')

module.exports = function (id) {
  // get data for object
  var object = _.find(window.oi.objects, function (object) {
    return object._id === id
  })

  return object || null
}
