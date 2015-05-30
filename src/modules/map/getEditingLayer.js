'use strict'

var ol = require('openlayers'),
  _ = require('underscore')

module.exports = function () {
  var map,
    layers,
    layer

  map = window.oi.olMap.map
  layers = map.getLayers().getArray()
  layer = _.find(layers, function (layer) {
    return layer.get('editing') === true
  })
  return layer
}
