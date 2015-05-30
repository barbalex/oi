/*
 * when a value is changed in the form
 * it is passed together with other information wrapped in an object
 * this function manages:
 * - saving the value to the database
 * - updating the navigation tree
 * - updating the map when geometries were changed
 * - creating new project-databases and starting syncing with them
 -   when a new project was created
 */

'use strict'

var $ = require('jquery'),
  dateformat = require('dateformat'),
  PouchDB = require('pouchdb'),
  getObject = require('../getObject'),
  addRoleToUserDb = require('../addRoleToUserDb'),
  getHierarchy = require('../getHierarchy'),
  guid = require('../guid'),
  updateUiAfterSavingValue = require('./updateUiAfterSavingValue'),
  objectWithoutUiState = require('../objectWithoutUiState')

module.exports = function (passedObject, value) {
  var projId = passedObject.projId,
    projectName = 'project_' + projId,
    id = passedObject._id,
    field = passedObject.label,
    inputType = passedObject.inputType,
    object,
    lastEdited = {},
    options = {
      auth: {
        username: window.oi.me.name,
        password: window.oi.me.password
      }
    },
    localDb = new PouchDB(projectName, options),
    featureCoordinatesBefore,
    projectDb,
    projHierarchyGuid = guid(),
    hierarchy,
    newHierarchy

  // get data for object
  object = getObject(id)

  console.log('saveObjectValue: object', object)

  // build lastEdited
  lastEdited.date = dateformat(new Date(), 'isoDateTime')
  lastEdited.user = window.oi.me.name
  lastEdited.database = window.oi.databaseId

  // bei geoJson: Value in Objekt verwandeln
  if (inputType === 'geoJson') {
    value = value ? JSON.parse(value) : null
    // remember coordinates so you can later move selection
    if (object.data[field] && object.data[field].coordinates) {
      featureCoordinatesBefore = object.data[field].coordinates
    }
  }

  if (object) {
    // set new value
    object.data[field] = value || null
    object.lastEdited = lastEdited
    // write to pouch
    if (!object._rev && object.parent === null) {
      // this is a new project > create it
      // get last hierarchy
      hierarchy = getHierarchy(object.projId)
      // deep copy this hierarchy
      newHierarchy = $.extend(true, {}, hierarchy)

      console.log('saveObjectValue: object before changing anything', object)

      newHierarchy._id = projHierarchyGuid
      delete newHierarchy._rev
      newHierarchy.projId = object._id
      // add the hierarchy to the model
      window.oi.hierarchies.push(newHierarchy)
      // give object the hId of the new hierarchy
      object.hId = projHierarchyGuid

      console.log('saveObjectValue: object after changing stuff', object)

      // add object to new local project-db
      projectDb = new PouchDB(projectName)
      projectDb.put(objectWithoutUiState(object)).then(function (response) {
        // update rev in model object
        object._rev = response.rev
        // update ui
        updateUiAfterSavingValue(object, value, field, inputType, featureCoordinatesBefore)
        // add new hierarchy to the new project db
        return projectDb.put(newHierarchy)
      }).catch(function (err) {
        console.log('error saving first project: ', err)
      })
      // add role to user in userDb
      // userDb syncs role to server
      // server script then creates projectDb in couch
      // this function also starts syncing the new project db
      addRoleToUserDb(projectName, localDb)
    } else {
      // this is a regular object in the same project
      localDb.put(objectWithoutUiState(object)).then(function (response) {
        // update rev in model object
        object._rev = response.rev
        // update ui
        updateUiAfterSavingValue(object, value, field, inputType, featureCoordinatesBefore)
      }).catch(function (err) {
        console.log('saveObjectValue: error: ', err)
      })
    }
  } else {
    console.log('Änderung wurde nicht gespeichert')
  }
}
