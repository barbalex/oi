'use strict'

var ol = require('openlayers')

module.exports = function () {
  var projection,
    mousePositionControl

  projection = ol.proj.get('EPSG:21781')
  // We have to set the extent!
  projection.setExtent([2420000, 130000, 2900000, 1350000])

  mousePositionControl = new ol.control.MousePosition({
    // This is the format we want the coordinate in
    // The number argument in createStringXY is the number of decimal places
    coordinateFormat: ol.coordinate.createStringXY(0),
    projection: 'EPSG:21781',
    undefinedHTML: '&nbsp;' // what openlayers will use if the map returns undefined for a map coordinate
  })
  return mousePositionControl
}
