'use strict'

var ol = require('openlayers')

module.exports = function () {
  return [
    /* We are using two different styles for the polygons:
     *  - The first style is for the polygons themselves.
     *  - The second style is to draw the vertices of the polygons.
     *    In a custom `geometry` function the vertices of a polygon are
     *    returned as `MultiPoint` geometry, which will be used to render
     *    the style.
     */
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255, 0, 0, 0.1)'
      })
    }),
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
          color: 'yellow'
        }),
        stroke: new ol.style.Stroke({
          color: 'red',
          width: 2
        })
      }),
      geometry: function (feature) {
        // return the coordinates of the first ring of the polygon
        var coordinates = feature.getGeometry().getCoordinates()[0]
        return new ol.geom.MultiPoint(coordinates)
      }
    })
  ]
}
