'use strict'

var _ = require('underscore'),
  ol = require('openlayers'),
  createLayerSwisstopoPixelFarbe = require('./createLayerSwisstopoPixelFarbe'),
  createLayerSwisstopoAerial = require('./createLayerSwisstopoAerial'),
  addProjectLayers = require('./addProjectLayers')

module.exports = function () {
  var mapQuestSat

  mapQuestSat = new ol.layer.Tile({
    source: new ol.source.MapQuest({layer: 'sat'})
  })

  window.oi.olMap.map.addLayer(createLayerSwisstopoPixelFarbe())
  window.oi.olMap.map.addLayer(createLayerSwisstopoAerial())
  addProjectLayers()
}
