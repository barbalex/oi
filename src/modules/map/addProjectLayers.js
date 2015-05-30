'use strict'

var _ = require('underscore'),
  capitalizeFirstLetter = require('../capitalizeFirstLetter'),
  createLayerForData = require('./createLayerForData')

module.exports = function () {
  var object,
    projId

  // loop through all hierarchies
  _.each(window.oi.hierarchies, function (hierarchy) {
    if (hierarchy.fields && hierarchy.fields.length > 0) {
      // loop through all fields
      _.each(hierarchy.fields, function (field) {
        // look for geoJson fields
        if (field.inputType && field.inputType === 'geoJson') {
          projId = _.find(window.oi.objects, function (object) {
            return object.hId === hierarchy._id
          }).projId
          object = {}
          object._id = null
          object.projId = projId
          object.hId = hierarchy._id
          object.label = field.label
          object.layerName = 'layer' + capitalizeFirstLetter(hierarchy.name) + capitalizeFirstLetter(field.label)
          object.layerTitle = hierarchy.name + ': ' + field.label
          createLayerForData(object)
        }
      })
    }
  })
}
