'use strict'

var ol = require('openlayers')

module.exports = function () {
  return new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 0, 0, 0.1)'
    }),
    image: new ol.style.Circle({
      radius: 5,
      fill: null,
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 4
      })
    })
  })
}
