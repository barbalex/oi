'use strict'

var _ = require('underscore')

module.exports = function () {
  var map = window.oi.olMap.map

  // there can be several snap interactions
  // remove all
  if (map.snapInteraction) {
    _.each(map.snapInteraction, function (snpInteraction) {
      map.removeInteraction(snpInteraction)
    })
    delete map.snapInteraction
  }
}
