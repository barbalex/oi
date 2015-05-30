'use strict'

var _ = require('underscore')

module.exports = function (extent, meters) {
  var extendedExtent = []
  meters = meters || 200

  extendedExtent.push(extent[0] - meters)
  extendedExtent.push(extent[1] - meters)
  extendedExtent.push(extent[2] + meters)
  extendedExtent.push(extent[3] + meters)

  return extendedExtent
}
