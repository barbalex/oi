// build up modify interaction
// needs a select and a modify interaction working together

'use strict'

var ol = require('openlayers'),
  $ = require('jquery'),
  removeFeatureData = require('./removeFeatureData'),
  toggleEditButtons = require('./toggleEditButtons'),
  removeAllInteractions = require('./removeAllInteractions'),
  addDragboxInteraction = require('./addDragboxInteraction'),
  onAddSelectedFeatures = require('./onAddSelectedFeatures'),
  onRemoveSelectedFeatures = require('./onRemoveSelectedFeatures'),
  addSnapInteractions = require('./addSnapInteractions')

module.exports = function (layer) {
  var map = window.oi.olMap.map,
    selectInteraction,
    modifyInteraction,
    selectedFeatures,
    layerName = layer.get('layerName')

  removeAllInteractions()

  // create select interaction
  selectInteraction = new ol.interaction.Select({
    // make sure only the desired layer can be selected
    layers: function (layer) {
      return layer.get('layerName') === layerName
    },
    condition: ol.events.condition.click
  })

  // make interactions global so they can later be removed
  window.oi.olMap.map.selectInteraction = selectInteraction
  map.addInteraction(selectInteraction)

  addDragboxInteraction()

  // grab the features from the select interaction to use in the modify interaction
  selectedFeatures = selectInteraction.getFeatures()

  // when features are changed
  selectedFeatures.on('remove', onRemoveSelectedFeatures)

  // when a feature is selected...
  selectedFeatures.on('add', onAddSelectedFeatures)

  // create the modify interaction
  modifyInteraction = new ol.interaction.Modify({
    features: selectedFeatures,
    // delete vertices by pressing the SHIFT key
    deleteCondition: function (event) {
      return (ol.events.condition.shiftKeyOnly(event) || $('#utilsEditDeletePoint').is(':checked')) &&
        ol.events.condition.singleClick(event)
    }
  })
  // make interactions global so they can later be removed
  window.oi.olMap.map.modifyInteraction = modifyInteraction
  // add it to the map
  map.addInteraction(modifyInteraction)
  // enable buttons
  toggleEditButtons()

  addSnapInteractions()
}
