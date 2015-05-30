'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  textarea = require('../../../templates/textarea'),
  formButtonToolbar = require('../../../templates/formButtonToolbar'),
  positionFormBtngroup = require('./positionFormBtngroup'),
  getObject = require('../getObject'),
  getHierarchy = require('../getHierarchy'),
  resizeTextareas = require('./resizeTextareas'),
  refreshScrollbar = require('../refreshScrollbar'),
  capitalizeFirstLetter = require('../capitalizeFirstLetter'),
  showMap = require('./showMap'),
  setActiveObject = require('../setActiveObject'),
  createHtmlForField = require('./createHtmlForField')

module.exports = function (id) {
  var html = '',
    textareaIds = [],
    object,
    hierarchy,
    $formContent = $('#formContent'),
    geomFeatures = []

  // get data for object
  object = getObject(id)

  if (object && object.hId) {
    hierarchy = getHierarchy(object.hId)
    if (hierarchy && hierarchy.fields) {
      // sort fields by order
      hierarchy.fields = _.sortBy(hierarchy.fields, function (field) {
        return field.order || 0
      })
      _.each(hierarchy.fields, function (field) {
        var value,
          templateObject = {},
          data = {},
          returnData

        value = object.data[field.label]
        templateObject.object = {}
        templateObject.object._id = id
        templateObject.object.type = 'object'
        templateObject.object.hId = object.hId
        templateObject.object.inputType = field.inputType
        templateObject.object.projId = object.projId || null
        templateObject.object.label = field.label
        templateObject.object.inputDataType = field.inputDataType || null
        templateObject.object.value = value
        templateObject.object.layerTitle = hierarchy.name + ': ' + field.label
        templateObject.object.layerName = 'layer' + capitalizeFirstLetter(hierarchy.name) + capitalizeFirstLetter(field.label)

        // prepare data to pass to createHtmlForField
        data.html = html
        data.textareaIds = textareaIds
        data.geomFeatures = geomFeatures
        data.field = field
        data.templateObject = templateObject

        returnData = createHtmlForField(data)

        // extract return data from createHtmlForField
        html = returnData.html
        geomFeatures = returnData.geomFeatures
        textareaIds = returnData.textareaIds
      })

      // add button toolbar
      html += formButtonToolbar()

      $formContent.html(html)

      positionFormBtngroup()
      resizeTextareas()
      refreshScrollbar()

      // entsprechenden Layer im Layertool öffnen (falls eine Geometrie existiert)
      showMap(geomFeatures, object)
      // aktives Objekt im model markieren
      setActiveObject(id)
    } else {
      console.log('error: found no hierarchy for object with id ', id)
    }
  } else {
    console.log('error: found no object with id ', id)
  }
}
