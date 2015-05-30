'use strict'

var ol = require('openlayers'),
  $ = require('jquery'),
  _ = require('underscore'),
  addSelectInteraction = require('../map/addSelectInteraction')

module.exports = function () {
  var layerName = $(this).closest('.list-group').data('object').layerName,
    layers = window.oi.olMap.map.getLayers().getArray(),
    layer

  layer = _.filter(layers, function (layer) {
    return layer.get('layerName') === layerName
  })[0]
  if (layer) {
    if (this.checked) {
      layer.set('editing', true)
      $('#utilsEditLayer').show()
      // trigger changing of edit-modus (starts modify-interaction)
      $('#utilsEditChoose').trigger('click')
    } else {
      layer.set('editing', false)
      $('#utilsEditLayer').hide()
      addSelectInteraction()
    }
  }
}
