'use strict'

var $ = require('jquery'),
  formButtonToolbar = require('../../../templates/formButtonToolbar'),
  positionFormBtngroup = require('./positionFormBtngroup'),
  setActiveObject = require('../setActiveObject'),
  initiateForObject = require('./initiateForObject'),
  initiateForHierarchy = require('./initiateForHierarchy')

module.exports = function (id, type) {
  switch (type) {
    case 'object':
      initiateForObject(id)
      break
    case 'hierarchy':
      initiateForHierarchy()
      break
  }
}
