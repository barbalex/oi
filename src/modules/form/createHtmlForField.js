'use strict'

var ol = require('openlayers'),
  input = require('../../../templates/input'),
  textarea = require('../../../templates/textarea'),
  checkbox = require('../../../templates/checkbox'),
  optionGroup = require('../../../templates/optionGroup'),
  checkboxGroup = require('../../../templates/checkboxGroup'),
  select = require('../../../templates/select'),
  geoJson = require('../../../templates/geoJson'),
  addCheckedToValueList = require('./addCheckedToValueList')

module.exports = function (data) {
  var html = data.html,
    textareaIds = data.textareaIds,
    geomFeatures = data.geomFeatures,
    field = data.field,
    templateObject = data.templateObject,
    geomFeature,
    id = templateObject.object._id,
    value = templateObject.object.value

  // Felder bauen
  switch (field.inputType) {
    case 'textarea':
      html += textarea(templateObject)
      textareaIds.push(id + field.label)
      break
    case 'input':
      switch (field.inputDataType) {
        case 'checkbox':
          // es ist eine einzelne checkbox. Mitgeben, ob sie checked ist
          templateObject.checked = value ? 'checked' : ''
          html += checkbox(templateObject)
          break
        case 'checkboxGroup':
          // checkboxGroup erstellen
          templateObject.object.valueList = addCheckedToValueList(field.valueList, value, 'checkboxGroup')
          html += checkboxGroup(templateObject)
          break
        case 'optionGroup':
          templateObject.object.valueList = addCheckedToValueList(field.valueList, value, 'optionGroup')
          html += optionGroup(templateObject)
          break
        case 'text':
        default:
          html += input(templateObject)
          break
      }
      break
    case 'select':
      // object.data muss Array sein - ist bei select nicht so, weil eh nur ein Wert gesetzt werden kann > Wert in Array setzen
      templateObject.object.valueList = addCheckedToValueList(field.valueList, value, 'select')
      html += select(templateObject)
      break
    case 'geoJson':
      // Daten als JSON in textarea schreiben
      templateObject.object.value = value ? JSON.stringify(value, null, 4) : ''
      html += geoJson(templateObject)
      textareaIds.push(id + field.label)
      // prepare feature to zoom the map to
      if (value && value.type && value.coordinates) {
        geomFeature = new ol.Feature()
        geomFeature.setGeometry(new ol.geom[value.type](value.coordinates))
        geomFeatures.push(geomFeature)
      }
      break
    default:
      html += input(templateObject)
      break
  }

  return { html: html, geomFeatures: geomFeatures, textareaIds: textareaIds }
}
