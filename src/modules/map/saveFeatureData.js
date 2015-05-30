'use strict'

var ol = require('openlayers'),
  $ = require('jquery'),
  _ = require('underscore'),
  getEditingLayer = require('./getEditingLayer'),
  getObject = require('../getObject'),
  saveObjectValue = require('../form/saveObjectValue'),
  fitTextareaToContent = require('../form/fitTextareaToContent')

module.exports = function (feature) {
  var format = new ol.format.GeoJSON(),
    // this will be the data in the chosen format
    data,
    layer,
    passingObject,
    objId,
    object,
    label,
    geomElem

  layer = getEditingLayer()
  // convert the data of the feature into GeoJson
  data = JSON.parse(format.writeFeature(feature)).geometry
  objId = feature.getId()
  object = getObject(objId)
  label = layer.get('fieldLabel')

  if (object) {
    // create object to pass to saveObjectValue
    passingObject = {}
    passingObject._id = objId
    passingObject.projId = object.projId
    passingObject.label = label
    passingObject.inputType = 'GeoJson'
    saveObjectValue(passingObject, data)
    // update field in ui
    geomElem = $('#' + objId + label)
    geomElem.val(JSON.stringify(data, null, 4))
    fitTextareaToContent(objId + label)
  }
}
