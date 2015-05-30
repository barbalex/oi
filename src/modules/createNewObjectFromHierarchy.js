'use strict'

var _ = require('underscore'),
  getHierarchy = require('./getHierarchy'),
  createNewObject = require('./createNewObject')

module.exports = function (hierarchyId, parentId) {
  var parentObject,
    // object ist eine Hülle, welche parent und projId übermittelt
    object,
    hierarchy

  hierarchy = getHierarchy(hierarchyId)
  if (hierarchy && hierarchy.parent) {
    // suche object der parent hierarchy
    parentObject = _.find(window.oi.objects, function (object) {
      return object._id === parentId
    })

    if (parentObject) {
      object = {}
      object.parent = parentObject._id
      object.projId = parentObject.projId
      createNewObject(object, hierarchy)
    } else {
      console.log('error: no object found for parent hierarchy')
    }
  } else {
    console.log('error: no parent hierarchy found for hierarchy with id = ', hierarchyId)
  }
}
