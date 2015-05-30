/*
 * deletes all the selected features from the select interaction
 * removes the also from the vector layer
 * then removes their geometry data in the corresponding objects
 */

'use strict'

var removeFeatureData = require('./removeFeatureData'),
  getEditingLayer = require('./getEditingLayer')

module.exports = function () {
  var map,
    layer,
    selectedFeatures

  map = window.oi.olMap.map
  selectedFeatures = map.selectInteraction.getFeatures()

  selectedFeatures.forEach(function (selectedFeature) {
    var selectedFeatureId,
      layerFeatures

    selectedFeatureId = selectedFeature.getId()

    // remove from selectInteraction
    selectedFeatures.remove(selectedFeature)

    // remove features from vectorlayer
    layer = getEditingLayer()
    layerFeatures = layer.getSource().getFeatures()
    layerFeatures.forEach(function (sourceFeature) {
      var sourceFeatureId = sourceFeature.getId()

      if (sourceFeatureId === selectedFeatureId) {
        layer.getSource().removeFeature(sourceFeature)
        // remove feature-data in DB
        removeFeatureData(sourceFeature)
      }
    })
  })
}
