'use strict'

var ol = require('openlayers'),
  extendExtent = require('./extendExtent')

module.exports = function (feature, buffer) {
  var featuresExtent,
    featureExtent,
    featureExtentEnlarged

  featuresExtent = ol.extent.createEmpty()
  featureExtent = feature.getGeometry().getExtent()
  featureExtentEnlarged = extendExtent(featureExtent, buffer || 200)
  ol.extent.extend(featuresExtent, featureExtentEnlarged)
  window.oi.olMap.map.getView().fitExtent(featuresExtent, window.oi.olMap.map.getSize())
}
