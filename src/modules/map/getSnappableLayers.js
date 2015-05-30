'use strict'

var ol = require('openlayers'),
  _ = require('underscore')

module.exports = function () {
  var map,
    layers,
    snappableLayers

  map = window.oi.olMap.map
  layers = map.getLayers().getArray()
  snappableLayers = _.filter(layers, function (layer) {
    return layer.get('snappable') === true
  })
  return snappableLayers
}
