'use strict'

var _ = require('underscore')

module.exports = function (hierarchyId) {
  // get data for object
  var hierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
    return hierarchy._id === hierarchyId
  })

  return hierarchy || null
}
