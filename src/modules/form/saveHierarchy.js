'use strict'

var dateformat = require('dateformat'),
  PouchDB = require('pouchdb') /*,
  $ = require('jquery'),
  _ = require('underscore'),
  getLabelForObject = require('../nav/getLabelForObject'),
  getHierarchy = require('../getHierarchy')*/

module.exports = function (hierarchy) {
  var lastEdited = {},
    localDb = new PouchDB(hierarchy.projId)

  // build lastEdited
  lastEdited.date = dateformat(new Date(), 'isoDateTime')
  lastEdited.user = window.oi.me.name
  lastEdited.database = window.oi.databaseId

  // set new value
  hierarchy.lastEdited = lastEdited

  // write to pouch
  localDb.put(hierarchy)
    .then(function (response) {
      // update rev in model object
      hierarchy._rev = response.rev

    // TODO: if field is nameField, update name in tree
    /*var correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
        return hierarchy._id === object.hId
    })
    if (object.data && correspondingHierarchy && correspondingHierarchy.nameField && correspondingHierarchy.nameField === field) {
        $('#navContent').jstree().rename_node('#' + object._id, getLabelForObject(object, correspondingHierarchy))
    }*/
    })
    .catch(function (err) {
      console.log('error: ', err)
    })
}
