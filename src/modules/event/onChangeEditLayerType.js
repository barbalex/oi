'use strict'

var ol = require('openlayers'),
  _ = require('underscore'),
  getEditingLayer = require('../map/getEditingLayer'),
  removeAllInteractions = require('../map/removeAllInteractions'),
  addModifyInteraction = require('../map/addModifyInteraction'),
  addDrawInteraction = require('../map/addDrawInteraction')

module.exports = function () {
  var layer,
    geometryType

  layer = getEditingLayer()

  // first remove all remaining interactions
  removeAllInteractions()

  if (layer) {
    if (this.id === 'utilsEditChoose') {
      // add modify interaction
      // and pass selected features
      addModifyInteraction(layer)
    } else {
      // add draw interaction
      geometryType = this.value
      addDrawInteraction(layer, geometryType)
    }
  }
}
