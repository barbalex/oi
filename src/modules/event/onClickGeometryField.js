'use strict'

var $ = require('jquery'),
  ol = require('openlayers'),
  showTab = require('../showTab'),
  zoomToFeature = require('../map/zoomToFeature'),
  getObject = require('../getObject')

module.exports = function () {
  var objectData = $(this).prev().data('object'),
    object,
    feature
    // selectInteraction = window.oi.olMap.map.selectInteraction,
    // selectedFeatures  = selectInteraction.getFeatures()

  if (objectData) {
    object = getObject(objectData._id)
    if (object && object.data && object.data[objectData.label] && object.data[objectData.label].type && object.data[objectData.label].coordinates) {
      // open map
      showTab('map')
      // zoom to feature
      feature = new ol.Feature()
      feature.setGeometry(new ol.geom[object.data[objectData.label].type](object.data[objectData.label].coordinates))
      zoomToFeature(feature, 200)
    // select feature
    // selectedFeatures.clear()
    // selectedFeatures.push(feature);   // SCHEISSE: DAS DESELEKTIERT DEN NODE IN JSTREE!!!
    }
  }
}
