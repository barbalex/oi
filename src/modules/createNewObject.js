/*
 * erhält eine Hierarchie
 * und ein Objekt: Dasjenige, von dem aus ein neues erstellt werden soll - es hat also denselben:
 * - type
 * - parent
 * - projId
 * erstellt ein neues Objekt dieser Hierarchie und den gemeinsamen Daten von object
 * (objekt kann auch einfach eine Hüllen sein, mit der diese Eigenschaften übergeben werden,
 * z.B. wenn das neue Objekt von der Hierarchie aus geschaffen wird)
 * fügt es zum Model
 * fügt es NICHT in die DB: es wird erst beim Speichern einer Eingabe in ein Feld in die DB geschrieben!
 * fügt es in den tree
 * retourniert es
 */

'use strict'

var _ = require('underscore'),
  $ = require('jquery'),
  dateformat = require('dateformat'),
  guid = require('./guid'),
  createTreeNodeObject = require('./nav/createTreeNodeObject'),
  createChildHierarchiesOfObject = require('./nav/createChildHierarchiesOfObject')

module.exports = function (object, hierarchy) {
  var newObject,
    parentNode,
    newObjectNode,
    childHierarchies,
    tree = $('#navContent').jstree(),
    $formContent = $('#formContent')

  // console.log('createNewObject: object', object)
    // console.log('createNewObject: object.hId', object.hId)

  newObject = {}
  newObject._id = guid()
  // newObject.hId                 = hierarchy._id

  // console.log('createNewObject: object.hId', object.hId)

  newObject.hId = object.hId

  // console.log('createNewObject: object.hId', object.hId)

  newObject.type = 'object'
  newObject.parent = object.parent
  // wenn ein neues Projekt erfasst wird, muss eine neue projId vergeben werden
  newObject.projId = object.parent ? object.projId : guid()
  newObject.lastEdited = {}
  newObject.lastEdited.date = dateformat(new Date(), 'isoDateTime')
  newObject.lastEdited.user = window.oi.me.name
  newObject.lastEdited.database = window.oi.databaseId
  newObject.data = {}
  if (hierarchy.fields) {
    _.each(hierarchy.fields, function (field) {
      if (field.label) {
        newObject.data[field.label] = null
      }
    })
  }

  // console.log('createNewObject: object.hId', object.hId)

  // ergänze model
  window.oi.objects.push(newObject)

  // deep copy newObject because otherwise weird things happen
  newObject = $.extend(true, {}, newObject)

  // füge dem node der hierarchy einen neuen node für newObject hinzu
  parentNode = newObject.parent ? '#' + newObject.parent + newObject.hId : '#'
  newObjectNode = createTreeNodeObject(newObject)
  tree.create_node(parentNode, newObjectNode)

  // ergänze child hierarchies
  childHierarchies = createChildHierarchiesOfObject(newObject)
  _.each(childHierarchies, function (childHierarchy) {
    tree.create_node('#' + newObject._id, childHierarchy)
  })

  // select newObject
  tree.deselect_all()
  tree.select_node('#' + newObject._id)

  // Fokus in das erste Feld setzen
  $formContent.find('.form-control').first().focus()

  // console.log('createNewObject: object.hId', object.hId)

  return newObject
}
