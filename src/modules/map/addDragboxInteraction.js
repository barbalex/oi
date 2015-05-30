/*
 * add a DragBox interaction used to select features by drawing boxes
 * while holding the shift key
 */

'use strict'

var ol = require('openlayers')

module.exports = function () {
  var map = window.oi.olMap.map,
    dragBox

  dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.shiftKeyOnly,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [0, 0, 255, 1]
      })
    })
  })

  map.addInteraction(dragBox)
  // make dragbox global so it can be removed later
  window.oi.olMap.map.dragBoxInteraction = dragBox
}
