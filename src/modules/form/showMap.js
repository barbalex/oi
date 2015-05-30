'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  showTab = require('../showTab'),
  zoomToFeatures = require('../map/zoomToFeatures')

module.exports = function (geomFeatures, object) {
  var selectedFeatures

  // wenn Geometrie existiert, entsprechenden Layer im Layertool öffnen
  if (geomFeatures && geomFeatures.length > 0) {
    // Karte anzeigen
    showTab('map')
    // zu den Geometrien zoomen
    // wenn ausgelöst duch Klick auf Geometrie auf Karte, soll nicht gezoomt werden
    if (!window.oi.olMap.dontZoom) {
      zoomToFeatures(geomFeatures, 200)
    } else {
      delete window.oi.olMap.dontZoom
    }

    // sie selectieren
    selectedFeatures = window.oi.olMap.map.selectInteraction.getFeatures()
    // bestehende Selektion aufheben
    selectedFeatures.clear()
    _.each(geomFeatures, function (geomFeature) {
      // make sure, selectInteraction doesn't select in tree
      window.oi.dontSelectTree = true
      selectedFeatures.push(geomFeature)
    })
    // Layer im Layertool öffnen
    $('#collapseProject' + object.projId).collapse('show')
  }
}
