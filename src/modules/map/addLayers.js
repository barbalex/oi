'use strict'

var createLayerSwisstopoPixelFarbe = require('./createLayerSwisstopoPixelFarbe'),
  createLayerSwisstopoAerial = require('./createLayerSwisstopoAerial'),
  addProjectLayers = require('./addProjectLayers')

module.exports = function () {
  window.oi.olMap.map.addLayer(createLayerSwisstopoPixelFarbe())
  window.oi.olMap.map.addLayer(createLayerSwisstopoAerial())
  addProjectLayers()
}
