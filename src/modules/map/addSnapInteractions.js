'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  getSnappableLayers = require('./getSnappableLayers'),
  addSnapInteraction = require('./addSnapInteraction')

module.exports = function () {
  var snappableLayers

  // check if snapping is wanted
  if ($('#utilsSnap').is(':checked')) {
    snappableLayers = getSnappableLayers()

    console.log('addSnapInteractions: snappableLayers', snappableLayers)

    _.each(snappableLayers, function (layer) {
      addSnapInteraction(layer)
    })
  }
}
