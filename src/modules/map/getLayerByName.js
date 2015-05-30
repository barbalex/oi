/*
 * is passed a layerName
 * returns the corresponding layer
 */

'use strict'

var _ = require('underscore')

module.exports = function (layerName) {
  var layer,
    layers

  layers = window.oi.olMap.map.getLayers().getArray()
  layer = _.find(layers, function (layer) {
    return layer.get('layerName') === layerName
  })
  return layer
}
